import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from './entities/course.entity';
import { Career } from 'src/careers/entities/career.entity';
import { TeachersDetail } from 'src/teachers-details/entities/teachers-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Career, TeachersDetail])],
  controllers: [CoursesController],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}
