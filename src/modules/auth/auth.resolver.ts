import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { AuthPayload } from './dto/auth.payload';
import { Public } from './decorators/public.decorator';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Public()
    @Mutation(() => AuthPayload)
    async login(
        @Args('input') input: LoginInput,
        @Context() context: { res: Response },
    ): Promise<AuthPayload> {
        const { accessToken, refreshToken, expiresSeconds, user } = await this.authService.login(input.username, input.password);

        context.res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: expiresSeconds * 1000,
        });

        return { accessToken, user } as AuthPayload;
    }

    @Public()
    @Mutation(() => AuthPayload)
    async register(
        @Args('input') input: RegisterInput,
        @Context() context: { res: Response },
    ): Promise<AuthPayload> {
        const { accessToken, refreshToken, expiresSeconds, user } = await this.authService.register({
            username: input.username,
            email: input.email,
            password: input.password,
            roleId: input.roleId,
        });

        context.res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: expiresSeconds * 1000,
        });

        return { accessToken, user } as AuthPayload;
    }

    @Public()
    @Mutation(() => AuthPayload)
    async refreshToken(
        @Context() context: { req: Request, res: Response },
    ): Promise<AuthPayload> {
        const oldToken = context.req.cookies['refreshToken'];
        if (!oldToken) throw new Error('Refresh token not found in cookies');

        const { accessToken, refreshToken: newRefresh, expiresSeconds, user } = await this.authService.refresh(oldToken);

        context.res.cookie('refreshToken', newRefresh, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: expiresSeconds * 1000,
        });

        return { accessToken, user } as AuthPayload;
    }
}
