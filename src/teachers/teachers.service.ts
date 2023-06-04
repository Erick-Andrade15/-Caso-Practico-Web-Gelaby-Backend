import { Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { TeachersDetail } from 'src/teachers-details/entities/teachers-detail.entity';
import { LaboratoryAssign } from 'src/laboratory_assign/entities/laboratory_assign.entity';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private teachersRepository: Repository<Teacher>,
    @InjectRepository(TeachersDetail) // Inyecta el repositorio TEACHER DETAIL
    private teachersdetailRepository: Repository<TeachersDetail>,
    @InjectRepository(LaboratoryAssign) // Inyecta el repositorio ASSING LABORATORY
    private laboratoryassignRepository: Repository<LaboratoryAssign>,
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

    if (!teacher) {
      throw new Error('Teacher not found');
    }

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

    // Actualizar los Asing Laboratory asociados al Laboratorio eliminada
    const laboratoriesassigns = await this.laboratoryassignRepository.find({
      where: { laboratory: teacher.teacher_id },
    });

    if (laboratoriesassigns.length > 0) {
      for (const laboratoryassign of laboratoriesassigns) {
        laboratoryassign.laboratory = null; // O asignar otro valor especial si lo deseas
        await this.laboratoryassignRepository.save(laboratoriesassigns);
      }
    }

    return this.teachersRepository.remove(teacher);
  }
}
