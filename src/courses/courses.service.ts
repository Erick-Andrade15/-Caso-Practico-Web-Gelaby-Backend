import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
  ) {}

  create(createCourseDto: CreateCourseDto) {
    const course = this.coursesRepository.create(createCourseDto);
    return this.coursesRepository.save(course);
  }
  

  findAll() {
    return this.coursesRepository.find({
      relations: ['career'],
      order: {
        course_id: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.coursesRepository.findOne({
      where: { course_id: id },
      relations: ['career'],
    });
  }

  async update(id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.coursesRepository.findOne({
      where: { course_id: id },
    });
    if (!course) {
      throw new Error('Course not found');
    }
    const updatedCourse = Object.assign(course, updateCourseDto);
    return this.coursesRepository.save(updatedCourse);
  }

  async remove(id: number) {
    const course = await this.coursesRepository.findOne({
      where: { course_id: id },
    });
    if (!course) {
      throw new Error('Course not found');
    }
    return this.coursesRepository.remove(course);
  }
}
