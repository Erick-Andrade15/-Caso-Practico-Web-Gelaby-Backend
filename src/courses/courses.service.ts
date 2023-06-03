import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
import { TeachersDetail } from 'src/teachers-details/entities/teachers-detail.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private coursesRepository: Repository<Course>,
    @InjectRepository(TeachersDetail) // Inyecta el repositorio Course
    private teachersdetailRepository: Repository<TeachersDetail>,
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

    // Actualizar los Detalle Curso asociados al Docente eliminada
    const teachersdetails = await this.teachersdetailRepository.find({
      where: { course: course.course_id },
    });

    if (teachersdetails.length > 0) {
      for (const teachersdetail of teachersdetails) {
        teachersdetail.course = null; // O asignar otro valor especial si lo deseas
        await this.teachersdetailRepository.save(teachersdetails);
      }
    }

    if (!course) {
      throw new Error('Course not found');
    }
    return this.coursesRepository.remove(course);
  }
}
