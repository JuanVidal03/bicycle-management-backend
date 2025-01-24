import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Bicycles } from '@prisma/client';
import { CreateBicycleDto } from '../domain/dto/createBicycle.dto';

@Injectable()
export class BicyclesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(bicycle: CreateBicycleDto): Promise<Bicycles> {
    return await this.prismaService.bicycles.create({ data: bicycle });
  }

  async findAll(): Promise<Bicycles[]> {
    return await this.prismaService.bicycles.findMany({
      where: { status: true },
    });
  }

  async findOneById(id: number): Promise<Bicycles> {
    const foundBicycle = await this.prismaService.bicycles.findUnique({
      where: { id, status: true },
    });

    if (!foundBicycle) {
      throw new NotFoundException('Bicycle has been not found.');
    }

    return foundBicycle;
  }

  async updateById(
    idBicycle: number,
    newBycicle: CreateBicycleDto,
  ): Promise<Bicycles> {
    await this.findOneById(idBicycle);

    const updatedBicycle = await this.prismaService.bicycles.update({
      where: { id: idBicycle },
      data: newBycicle,
    });

    return updatedBicycle;
  }

  async deleteById(id: number): Promise<Bicycles> {
    await this.findOneById(id);

    const bicycleDeleted = await this.prismaService.bicycles.update({
      where: { id },
      data: { status: false },
    });

    return bicycleDeleted;
  }
}
