import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { BicyclesModule } from './bicycles/bicycles.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    PrismaModule,
    BicyclesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
