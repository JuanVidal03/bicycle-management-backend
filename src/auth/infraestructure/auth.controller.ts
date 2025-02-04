import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../application/auth.service';
import { CreateUserDto } from '../domain/dto/createUser.dto';
import { UserResponse } from 'src/users/domain/interface/userResponse.interface';
import { User } from '../domain/interface/userResponse.interface';
import { CredentialsDto } from '../domain/dto/credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() newUser: CreateUserDto): Promise<UserResponse> {
    const registerUser = await this.authService.register(newUser);

    const user: User = {
      id: registerUser.id,
      email: registerUser.email,
      nombre: registerUser.nombre,
      rol: registerUser.rol,
      status: registerUser.status,
      estrato_socioeconomico: registerUser.estrato_socioeconomico,
    };

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Register successfully!',
      data: user,
    };
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() credentials: CredentialsDto): Promise<UserResponse> {
    const loginResponse = await this.authService.login(credentials);

    return {
      statusCode: HttpStatus.OK,
      message: 'Login successfully!',
      data: loginResponse,
    };
  }
}
