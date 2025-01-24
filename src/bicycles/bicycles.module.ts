import { Module } from '@nestjs/common';
import { BicyclesService } from './application/bicycles.service';
import { BicyclesController } from './infraestructure/bicycles.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BicyclesController],
  providers: [BicyclesService],
  exports: [BicyclesService],
})
export class BicyclesModule {}
