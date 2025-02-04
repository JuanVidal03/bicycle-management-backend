import { Module } from '@nestjs/common';
import { UsersController } from './infraestructure/users.controller';
import { UsersService } from './application/users.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
