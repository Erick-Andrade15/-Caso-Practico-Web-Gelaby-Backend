import { Module } from '@nestjs/common';
import { TeachersDetailsService } from './teachers-details.service';
import { TeachersDetailsController } from './teachers-details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeachersDetail } from './entities/teachers-detail.entity';
import { Course } from 'src/courses/entities/course.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Subject } from 'src/subjects/entities/subject.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TeachersDetail, Teacher, Subject, Course])],
  controllers: [TeachersDetailsController],
  providers: [TeachersDetailsService],
})
export class TeachersDetailsModule {}
