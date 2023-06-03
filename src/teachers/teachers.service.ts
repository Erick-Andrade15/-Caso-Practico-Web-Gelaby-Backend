import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { TeachersDetail } from 'src/teachers-details/entities/teachers-detail.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teachersRepository: Repository<Teacher>,
    @InjectRepository(TeachersDetail) // Inyecta el repositorio Course
    private teachersdetailRepository: Repository<TeachersDetail>,
  ) {}

  findAll() {
    return this.teachersRepository.find({
      order: {
        teacher_id: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.teachersRepository.findOne({
      where: { teacher_id: id },
    });
  }

  create(createTeacherDto: CreateTeacherDto) {
    const teacher = this.teachersRepository.create(createTeacherDto);
    return this.teachersRepository.save(teacher);
  }

  async update(id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.teachersRepository.findOne({
      where: { teacher_id: id },
    });
    if (!teacher) {
      throw new Error('Teacher not found');
    }
    const updatedTeacher = Object.assign(teacher, updateTeacherDto);
    return this.teachersRepository.save(updatedTeacher);
  }

  async remove(id: number) {
    const teacher = await this.teachersRepository.findOne({
      where: { teacher_id: id },
    });

    // Actualizar los Detalle Curso asociados al Docente eliminada
    const teachersdetails = await this.teachersdetailRepository.find({
      where: { teacher: teacher.teacher_id },
    });

    if (teachersdetails.length > 0) {
      for (const teachersdetail of teachersdetails) {
        teachersdetail.teacher = null; // O asignar otro valor especial si lo deseas
        await this.teachersdetailRepository.save(teachersdetails);
      }
    }

    if (!teacher) {
      throw new Error('Teacher not found');
    }
    return this.teachersRepository.remove(teacher);
  }
}
