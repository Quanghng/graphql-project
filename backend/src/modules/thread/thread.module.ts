import { Module } from "@nestjs/common";
import { ThreadService } from "./thread.service";
import { ThreadResolver } from "./thread.resolver";
import { PrismaService } from "../prisma/prisma.service";

@Module({
  providers: [ThreadService, ThreadResolver, PrismaService]
})
export class ThreadModule { }