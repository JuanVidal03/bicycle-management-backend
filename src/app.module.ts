import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BicyclesModule } from './bicycles/bicycles.module';

@Module({
  imports: [PrismaModule, BicyclesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
