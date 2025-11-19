import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { RefreshToken } from './entities/refresh-token.entity';
import { User } from '../users/entities/user.entity';
import { UsersModule } from '../users/users.module';
import { parseDurationToSeconds } from '../../utils/time.util';

@Module({
    imports: [
        ConfigModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const expiresSeconds = parseDurationToSeconds(config.get<string>('JWT_EXPIRES_IN'), 15 * 60);
                return {
                    secret: config.get<string>('JWT_SECRET') ?? 'change_this_secret',
                    signOptions: { expiresIn: expiresSeconds },
                };
            },
        }),
        MikroOrmModule.forFeature([RefreshToken, User]),
        UsersModule,
    ],
    providers: [AuthService, AuthResolver],
    exports: [AuthService],
})
export class AuthModule { }
