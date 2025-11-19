import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { AuthPayload } from './dto/auth.payload';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => AuthPayload)
    async login(@Args('input') input: LoginInput): Promise<AuthPayload> {
        const { accessToken, refreshToken, user } = await this.authService.login(input.username, input.password);
        return { accessToken, refreshToken, user } as unknown as AuthPayload;
    }

    @Mutation(() => AuthPayload)
    async register(@Args('input') input: RegisterInput): Promise<AuthPayload> {
        const { accessToken, refreshToken, user } = await this.authService.register({
            username: input.username,
            email: input.email,
            password: input.password,
            roleId: input.roleId,
        });
        return { accessToken, refreshToken, user } as unknown as AuthPayload;
    }

    @Mutation(() => AuthPayload)
    async refreshToken(@Args('refreshToken') refreshToken: string): Promise<AuthPayload> {
        const { accessToken, refreshToken: newRefresh, user } = await this.authService.refresh(refreshToken);
        return { accessToken, refreshToken: newRefresh, user } as unknown as AuthPayload;
    }
}
