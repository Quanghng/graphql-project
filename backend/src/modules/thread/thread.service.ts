import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PostThreadDto } from "./dto/post-thread.dto";
import { Thread } from "@prisma/client";

@Injectable()
export class ThreadService {
  constructor(private readonly prismaService: PrismaService) { }

  async getThreadsByUser(userId: number) {
    // Check if user exists 
    const userExists = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    if (!userExists) {
      throw new Error("User not found");
    }

    return this.prismaService.thread.findMany({
      where: {
        userId,
      },
    });
  }

  async postThread(inputs: PostThreadDto): Promise<Thread> {
    // Check if user exists 
    const userExists = await this.prismaService.user.findUnique({
      where: { id: inputs.userId },
    });
    if (!userExists) {
      throw new Error("User not found");
    }

    // Create thread
    return this.prismaService.thread.create({
      data: {
        userId: inputs.userId,
        title: inputs.title,
        content: inputs.content,
      },
    });
  }
}