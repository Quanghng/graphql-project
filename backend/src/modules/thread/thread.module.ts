import { Module } from "@nestjs/common";
import { ThreadService } from "./thread.service";
import { ThreadResolver } from "./thread.resolver";
import { PrismaService } from "../prisma/prisma.service";
import { ThreadLoader } from "./loaders/thread.loader";
import { CommentLoader } from "../comment/loaders/comment.loader";

@Module({
  providers: [ThreadService, ThreadResolver, PrismaService, CommentLoader]
})
export class ThreadModule { }