import { Test, TestingModule } from '@nestjs/testing';
import { BicyclesService } from '../application/bicycles.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BicycleState } from 'src/utils/bicycleState.enum';
import { NotFoundException } from '@nestjs/common';

const prismaMock = {
  bicycles: {
    findUnique: jest.fn(),
    findMany: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  },
};

describe('BicyclesService', () => {
  let bicycleService: BicyclesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BicyclesService,
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    bicycleService = module.get<BicyclesService>(BicyclesService);
  });

  describe('get all bicycles', () => {
    it('should return all bicycles', async () => {
      const bicyclesArray = [
        {
          id: 1,
          marca: 'TREK',
          color: 'Negro',
          estado: 'DISPONIBLE',
          precio: 30000,
        },
      ];

      prismaMock.bicycles.findMany.mockResolvedValue(bicyclesArray);

      const bicycles = await bicycleService.findAll();
      expect(bicycles).toEqual(bicyclesArray);
    });
  });

  describe('create a bicycle', () => {
    it('should create a bicycle', async () => {
      const payload = {
        marca: 'TREK',
        color: 'Roja',
        precio: 30000,
        estado: BicycleState.DISPONIBLE,
      };

      const newBicycle = {
        marca: 'TREK',
        color: 'Roja',
        precio: 30000,
        estado: 'DISPONIBLE',
      };

      prismaMock.bicycles.create.mockResolvedValue(payload);
      const bicycleCreated = await bicycleService.create(payload);

      expect(bicycleCreated).toEqual(newBicycle);
    });
  });

  describe('find bicycle by id', () => {
    it('should return the found bicycle', async () => {
      const bicycle = {
        id: 1,
        marca: 'TREK',
        color: 'Roja',
        precio: 30000,
        estado: 'DISPONIBLE',
      };

      prismaMock.bicycles.findUnique.mockResolvedValue(bicycle);
      const foundBicycle = await bicycleService.findOneById(1);

      expect(foundBicycle).toEqual(bicycle);
    });

    it('should throw a NotFoundException if the bicycle is not found', async () => {
      prismaMock.bicycles.findUnique.mockResolvedValue(null);

      await expect(bicycleService.findOneById(1)).rejects.toThrow(
        'Bicycle has been not found.',
      );
    });
  });

  describe('update bicycle by id', () => {
    it('should update the bicycle', async () => {
      const bicycleId: number = 1;

      const existingBicycle = {
        id: bicycleId,
        marca: 'TREK',
        color: 'Roja',
        precio: 25000,
        estado: BicycleState.DISPONIBLE,
        status: true,
        createdAt: new Date('2025-01-01T00:00:00Z'),
        updatedAt: new Date(),
      };

      const toUpdate = {
        marca: 'new Marca',
        color: 'Roja',
        precio: 30000,
        estado: BicycleState.DISPONIBLE,
      };

      const updatedRecord = {
        id: bicycleId,
        ...toUpdate,
      };

      jest
        .spyOn(bicycleService, 'findOneById')
        .mockResolvedValue(existingBicycle);

      prismaMock.bicycles.update.mockResolvedValue(updatedRecord);
      const bicycleUpdated = await bicycleService.updateById(
        bicycleId,
        toUpdate,
      );

      expect(bicycleUpdated).toEqual(updatedRecord);
    });

    it('should throw a NotFoundException if the bicycle is not found', async () => {
      const bicycleId: number = 1;
      const toUpdate = {
        marca: 'new Marca',
        color: 'Roja',
        precio: 30000,
        estado: BicycleState.DISPONIBLE,
      };

      jest.spyOn(bicycleService, 'findOneById').mockImplementation(() => {
        throw new NotFoundException('Bicycle has been not found.');
      });

      prismaMock.bicycles.update.mockResolvedValue(null);

      await expect(
        bicycleService.updateById(bicycleId, toUpdate),
      ).rejects.toThrow('Bicycle has been not found.');
    });
  });

  describe('delete bicycle by id', () => {
    it('should delete the bicycle by id', async () => {
      const bicycleId: number = 1;

      const bicycle = {
        id: bicycleId,
        marca: 'TREK',
        color: 'Roja',
        precio: 25000,
        estado: BicycleState.DISPONIBLE,
        status: true,
        createdAt: new Date('2025-01-01T00:00:00Z'),
        updatedAt: new Date(),
      };

      const bicycleDeleted = {
        ...bicycle,
        status: false,
      };

      jest.spyOn(bicycleService, 'findOneById').mockResolvedValue(bicycle);

      prismaMock.bicycles.update.mockResolvedValue(bicycleDeleted);
      const deleted = await bicycleService.deleteById(bicycleId);

      expect(deleted).toEqual(bicycleDeleted);
    });

    it('should throw a NotFoundException if the bicycle is not found', async () => {
      const bicycleId: number = 1;

      jest.spyOn(bicycleService, 'findOneById').mockImplementation(() => {
        throw new NotFoundException('Bicycle has been not found.');
      });

      prismaMock.bicycles.update.mockResolvedValue(null);
      await expect(bicycleService.deleteById(bicycleId)).rejects.toThrow(
        'Bicycle has been not found.',
      );
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
