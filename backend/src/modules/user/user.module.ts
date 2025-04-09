import { Module } from "@nestjs/common";
import { UserResolver } from "./user.resolver";
import { UserService } from "./user.service";
import { ThreadService } from "../thread/thread.service";
import { PrismaService } from "../prisma/prisma.service";
import { ThreadLoader } from "../thread/loaders/thread.loader";


@Module({
  providers: [UserService, UserResolver, ThreadService, ThreadLoader, PrismaService]
})
export class UserModule { }