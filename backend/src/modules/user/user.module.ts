import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { ThreadService } from "../thread/thread.service";
import { PrismaService } from "../prisma/prisma.service";


@Module({
  providers: [UserService, UserResolver, ThreadService, PrismaService]
})
export class UserModule { }