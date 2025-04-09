import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { User } from "./models/user.model";

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) { }

  async getUserById(id: number): Promise<User> {
    const user = await this.prismaService.user.findUnique({
      where: { id },
    });
    if (!user) throw new ForbiddenException("User not found");
    return user as User;
  }
}