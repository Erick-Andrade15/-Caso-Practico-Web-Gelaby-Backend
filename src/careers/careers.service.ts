import { Injectable } from '@nestjs/common';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Career } from './entities/career.entity';
import { Course } from 'src/courses/entities/course.entity';

@Injectable()
export class CareersService {
  constructor(
    @InjectRepository(Career)
    private careersRepository: Repository<Career>,
    @InjectRepository(Course) // Inyecta el repositorio Course
    private coursesRepository: Repository<Course>,
  ) {}

  create(createCareerDto: CreateCareerDto) {
    const career = this.careersRepository.create(createCareerDto);
    return this.careersRepository.save(career);
  }

  findAll() {
    return this.careersRepository.find({
      order: {
        career_id: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.careersRepository.findOne({
      where: { career_id: id },
    });
  }

  async update(id: number, updateCareerDto: UpdateCareerDto) {
    const career = await this.careersRepository.findOne({
      where: { career_id: id },
    });
    if (!career) {
      throw new Error('Career not found');
    }
    const updatedCareer = Object.assign(career, updateCareerDto);
    return this.careersRepository.save(updatedCareer);
  }

  async remove(id: number) {
    const career = await this.careersRepository.findOne({
      where: { career_id: id },
    });
    if (!career) {
      throw new Error('Career not found');
    }

    // Actualizar los cursos asociados a la carrera eliminada
    const courses = await this.coursesRepository.find({
      where: { career: career.career_id },
    });

    if (courses.length > 0) {
      for (const course of courses) {
        course.career = null; // O asignar otro valor especial si lo deseas
        await this.coursesRepository.save(course);
      }
    }

    return this.careersRepository.remove(career);
  }
}
