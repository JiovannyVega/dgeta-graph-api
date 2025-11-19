import { Injectable, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import * as bcrypt from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { RefreshToken } from './entities/refresh-token.entity';
import { UsersService } from '../users/users.service';
import { parseDurationToSeconds } from '../../utils/time.util';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        private readonly usersService: UsersService,
        @InjectRepository(User)
        private readonly userRepo: EntityRepository<User>,
        @InjectRepository(RefreshToken)
        private readonly refreshRepo: EntityRepository<RefreshToken>,
    ) { }

    private async generateAccessToken(user: User) {
        const payload = { sub: user.user_id, username: user.username };
        const expiresSeconds = parseDurationToSeconds(this.config.get<string>('JWT_EXPIRES_IN'), 15 * 60);
        return this.jwtService.signAsync(payload, {
            secret: this.config.get<string>('JWT_SECRET') ?? 'change_this_secret',
            expiresIn: expiresSeconds,
        });
    }

    private async generateRefreshToken(user: User): Promise<{ token: string; expiresSeconds: number }> {
        const payload = { sub: user.user_id };
        const expiresSeconds = parseDurationToSeconds(this.config.get<string>('JWT_REFRESH_EXPIRES_IN'), 7 * 24 * 3600);
        const token = await this.jwtService.signAsync(payload, {
            secret: this.config.get<string>('JWT_REFRESH_SECRET') ?? 'change_this_refresh_secret',
            expiresIn: expiresSeconds,
        });
        return { token, expiresSeconds };
    }

    async validateUserByCredentials(username: string, password: string) {
        const user = await this.userRepo.findOne({ $or: [{ username }, { email: username }] }, { populate: ['role'] });
        if (!user) return null;
        const ok = await bcrypt.compare(password, user.password_hash);
        if (!ok) return null;
        return user;
    }

    async login(username: string, password: string) {
        const user = await this.validateUserByCredentials(username, password);
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const accessToken = await this.generateAccessToken(user);
        const { token: refreshToken, expiresSeconds } = await this.generateRefreshToken(user);

        const rt = new RefreshToken();
        rt.token = refreshToken;
        rt.user = user;
        rt.created_at = new Date();
        rt.expires_at = new Date(rt.created_at.getTime() + expiresSeconds * 1000);
        await this.refreshRepo.getEntityManager().persistAndFlush(rt);

        return { accessToken, refreshToken, user };
    }

    async refresh(oldToken: string) {
        try {
            // verify token signature with refresh secret
            const payload = await this.jwtService.verifyAsync(oldToken, {
                secret: this.config.get<string>('JWT_REFRESH_SECRET') ?? 'change_this_refresh_secret',
            });
            const sub = payload.sub;
            if (!sub) throw new UnauthorizedException('Invalid token payload');

            const stored = await this.refreshRepo.findOne({ token: oldToken }, { populate: ['user'] });
            if (!stored || stored.revoked) throw new UnauthorizedException('Refresh token revoked or not found');

            // Optionally rotate: revoke old and create new
            stored.revoked = true;
            await this.refreshRepo.getEntityManager().flush();

            const user = stored.user as User;
            const accessToken = await this.generateAccessToken(user);
            const { token: refreshToken, expiresSeconds } = await this.generateRefreshToken(user);

            const newRt = new RefreshToken();
            newRt.token = refreshToken;
            newRt.user = user;
            newRt.created_at = new Date();
            newRt.expires_at = new Date(newRt.created_at.getTime() + expiresSeconds * 1000);
            await this.refreshRepo.getEntityManager().persistAndFlush(newRt);

            return { accessToken, refreshToken, user };
        } catch (err) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    async register(input: { username: string; email: string; password: string; roleId?: number }) {
        // reuse UsersService.create to handle hashing and role assignment
        const user = await this.usersService.create({
            username: input.username,
            password: input.password,
            email: input.email,
            roleId: input.roleId ?? 1,
        });

        // generate tokens
        const accessToken = await this.generateAccessToken(user as User);
        const { token: refreshToken, expiresSeconds } = await this.generateRefreshToken(user as User);

        const rt = new RefreshToken();
        rt.token = refreshToken;
        rt.user = user as User;
        rt.created_at = new Date();
        rt.expires_at = new Date(rt.created_at.getTime() + expiresSeconds * 1000);
        await this.refreshRepo.getEntityManager().persistAndFlush(rt);

        return { accessToken, refreshToken, user };
    }
}
