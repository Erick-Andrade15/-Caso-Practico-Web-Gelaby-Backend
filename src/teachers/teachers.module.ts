import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { TeachersDetail } from 'src/teachers-details/entities/teachers-detail.entity';
import { LaboratoryAssign } from 'src/laboratory_assign/entities/laboratory_assign.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher,TeachersDetail,LaboratoryAssign])],
  controllers: [TeachersController],
  providers: [TeachersService],
  exports: [TeachersService],
})
export class TeachersModule {}
