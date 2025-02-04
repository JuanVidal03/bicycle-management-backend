import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Users } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Users[]> {
    const allUsers: Users[] = await this.prismaService.users.findMany({
      where: { status: true },
    });

    return allUsers.reverse();
  }

  async findByEmail(email: string): Promise<Users> {
    const foundUser = await this.prismaService.users.findFirst({
      where: { status: true, email },
    });

    if (!foundUser) {
      throw new NotFoundException('The user has been not found.');
    }

    return foundUser;
  }
}
