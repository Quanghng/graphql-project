import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentResolver } from "./comment.resolver";
import { PrismaService } from "../prisma/prisma.service";
import { CommentLoader } from "./loaders/comment.loader";


@Module({
  providers: [CommentService, CommentResolver, CommentLoader, PrismaService]
})
export class CommentModule { }