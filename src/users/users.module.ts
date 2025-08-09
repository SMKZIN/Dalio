import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/database/prisma.service';
import { AppModule } from 'src/app.module';

@Module({
  imports: [AppModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService]
})
export class UsersModule {}
