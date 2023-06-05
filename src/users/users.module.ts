import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EmailService } from './email.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, EmailService])],
  controllers: [UsersController],
  providers: [UsersService,EmailService],
  exports: [UsersService],
})
export class UsersModule {}
