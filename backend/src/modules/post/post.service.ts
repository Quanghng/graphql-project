import { Injectable } from "@nestjs/common";
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(userId: number, title: string, content: string) {
    return this.prisma.post.create({
      data: {
        title,
        content,
        likes: 0,
        user: { connect: { id: userId } },
      },
      include: {
        user: true,           // 返回 user
        comments: {           // 以及其中的 comments
          include: { user: true },
        },
      },
    });
  };
  
  async getAllPosts() {
    return this.prisma.post.findMany({
      include: {
        user: true, 
        comments: {
          include: {
            user: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
