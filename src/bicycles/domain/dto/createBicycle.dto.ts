/* eslint-disable indent */
import { IsNotEmpty, IsString, IsNumber, IsEnum } from 'class-validator';
import { BicycleState } from 'src/utils/bicycleState.enum';

export class CreateBicycleDto {
  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsEnum(BicycleState)
  @IsNotEmpty()
  estado: BicycleState = BicycleState.DISPONIBLE;

  @IsNumber()
  @IsNotEmpty()
  precio: number;
}
