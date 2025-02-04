import { Controller, Get, HttpStatus } from '@nestjs/common';
import { UsersService } from '../application/users.service';
import { UserResponse } from '../domain/interface/userResponse.interface';
import { UserSchema } from '../domain/interface/userSchema.interface';
import { Users } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<UserResponse> {
    const userResponse: Users[] = await this.usersService.findAll();

    const users: UserSchema[] = userResponse.map((user) => ({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      estrato_socioeconomico: user.estrato_socioeconomico,
      rol: user.rol,
      status: user.status,
    }));

    return {
      statusCode: HttpStatus.OK,
      message: 'Find all users successfully!',
      data: users,
    };
  }
}
