import { Injectable } from '@nestjs/common';
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
}
