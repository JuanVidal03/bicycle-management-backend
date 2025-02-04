/* eslint-disable indent */
import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from 'src/utils/userRoles.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  @IsNotEmpty()
  estrato_socioeconomico: number;

  @IsEnum(UserRoles)
  @IsNotEmpty()
  rol: UserRoles = UserRoles.USUARIO;
}
