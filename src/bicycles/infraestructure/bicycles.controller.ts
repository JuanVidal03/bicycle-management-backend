import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { BicyclesService } from '../application/bicycles.service';
import { BicycleResponse } from '../domain/interface/bicycleResponse.interface';
import { Bicycles } from '@prisma/client';
import { CreateBicycleDto } from '../domain/dto/createBicycle.dto';
import { BicycleSchema } from '../domain/interface/bicycleSchema.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('bicycles')
export class BicyclesController {
  constructor(private readonly bicyclesService: BicyclesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async createBicycle(
    @Body() bicycle: CreateBicycleDto,
  ): Promise<BicycleResponse> {
    const bicycleCreatedResponse: Bicycles =
      await this.bicyclesService.create(bicycle);

    const bicycleCreated: BicycleSchema = {
      id: bicycleCreatedResponse.id,
      marca: bicycleCreatedResponse.marca,
      color: bicycleCreatedResponse.color,
      estado: bicycleCreatedResponse.estado,
      precio: bicycleCreatedResponse.precio,
    };

    return {
      statusCode: HttpStatus.CREATED,
      message: 'Bicycle created successfully',
      data: bicycleCreated,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAllBicycles(): Promise<BicycleResponse> {
    const bicycles: Bicycles[] = await this.bicyclesService.findAll();

    const bicyclesResponse: BicycleSchema[] = bicycles.map((bicycle) => {
      return {
        id: bicycle.id,
        marca: bicycle.marca,
        color: bicycle.color,
        estado: bicycle.estado,
        precio: bicycle.precio,
      };
    });

    return {
      statusCode: HttpStatus.OK,
      message: 'Bicycles retrieved successfully',
      data: bicyclesResponse,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findById(@Param('id') id: string): Promise<BicycleResponse> {
    const bicycle: Bicycles = await this.bicyclesService.findOneById(
      Number(id),
    );

    const bicycleResponse: BicycleSchema = {
      id: bicycle.id,
      marca: bicycle.marca,
      color: bicycle.color,
      estado: bicycle.estado,
      precio: bicycle.precio,
    };

    return {
      statusCode: HttpStatus.OK,
      message: 'Bicycle retrieved successfully',
      data: bicycleResponse,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  async updateById(
    @Param('id') id: string,
    @Body() newBicycle: CreateBicycleDto,
  ): Promise<BicycleResponse> {
    const updatedBicycle: Bicycles = await this.bicyclesService.updateById(
      Number(id),
      newBicycle,
    );

    const bicycle: BicycleSchema = {
      id: updatedBicycle.id,
      marca: updatedBicycle.marca,
      color: updatedBicycle.color,
      estado: updatedBicycle.estado,
      precio: updatedBicycle.precio,
    };

    return {
      statusCode: HttpStatus.OK,
      message: 'Bicycle updated successfully!',
      data: bicycle,
    };
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<BicycleResponse> {
    const bicycle = await this.bicyclesService.deleteById(Number(id));

    const bicycleResponse: BicycleSchema = {
      id: bicycle.id,
      marca: bicycle.marca,
      color: bicycle.color,
      estado: bicycle.estado,
      precio: bicycle.precio,
    };

    return {
      statusCode: HttpStatus.OK,
      message: 'Bicycle deleted successfully!',
      data: bicycleResponse,
    };
  }
}
