import { Module } from "@nestjs/common";
import { AuthController } from "./auth.conotroller";
import { AuthService } from "./auth.service";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { CsrfGuard } from "src/csrf/guards/csrf.guards";
import { AccessTokenStrategy } from "src/csrf/strategies/accessToken.strategy";
import { RefreshTokenStrategy } from "src/csrf/strategies/refreshToken.strategy";
import { CsrfService } from "src/csrf/csrf.service";
import { PrismaService } from "src/modules/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    CsrfGuard,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    PrismaService,
    ConfigService,
    JwtService
  ]
})

export class AuthModule { }