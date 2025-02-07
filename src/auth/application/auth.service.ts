import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/application/users.service';
import { Users } from '@prisma/client';
import { CreateUserDto } from '../domain/dto/createUser.dto';
import * as bcryptjs from 'bcryptjs';
import { CredentialsDto } from '../domain/dto/credentials.dto';
import { LoginResponse } from '../domain/interface/loginResponse.interface';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from '../domain/interface/loginPayload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private readonly logger = new Logger(AuthService.name);

  async register(newUser: CreateUserDto): Promise<Users> {
    const { email, password } = newUser;

    try {
      const foundUser = await this.prismaService.users.findFirst({
        where: { status: true, email },
      });

      if (foundUser) {
        throw new ConflictException(
          `The user with email: ${email} already exists.`,
        );
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      const payload = {
        ...newUser,
        password: hashedPassword,
      };

      const userCreated: Users = await this.prismaService.users.create({
        data: payload,
      });

      this.logger.log('User created successfully!');

      return userCreated;
    } catch (error) {
      this.logger.error(`Error creating user: ${error.message}`);

      throw new InternalServerErrorException(
        'An error occurred while creating the user. Please try again later.',
      );
    }
  }

  async login(credentials: CredentialsDto): Promise<LoginResponse> {
    const { email, password } = credentials;

    const user = await this.validateUser(email, password);

    const payload: LoginPayload = {
      email: user.email,
      rol: user.rol,
      id: user.id,
    };

    return {
      rol: user.rol,
      email: user.email,
      accessToken: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<Users> {
    const foundUser = await this.userService.findByEmail(email);

    const isPasswordValid = await bcryptjs.compare(
      password,
      foundUser.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return foundUser;
  }
}
