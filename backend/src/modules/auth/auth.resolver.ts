import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { AuthResponse } from './dto/auth-response.dto';
import { Response } from 'express';
import { Res } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AuthResponse)
    async register(
        @Args('email') email: string,
        @Args('password') password: string,
        @Res({ passthrough: true }) res: Response
        ): Promise<AuthResponse> {
    return this.authService.signUp({ email, password }, res) as unknown as AuthResponse;
}

    @Mutation(() => AuthResponse)
    async login(
        @Args('email') email: string,
        @Args('password') password: string,
        @Res({ passthrough: true }) res: Response
    ): Promise<AuthResponse> {
        return this.authService.signIn({ email, password }, res) as unknown as AuthResponse;
    }

} 