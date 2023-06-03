import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';
import { TeachersDetail } from 'src/teachers-details/entities/teachers-detail.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
    @InjectRepository(TeachersDetail) // Inyecta el repositorio Course
    private teachersdetailRepository: Repository<TeachersDetail>,
  ) {}

  create(createSubjectDto: CreateSubjectDto) {
    const subject = this.subjectsRepository.create(createSubjectDto);
    return this.subjectsRepository.save(subject);
  }

  findAll() {
    return this.subjectsRepository.find({
      order: {
        subject_id: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.subjectsRepository.findOne({
      where: { subject_id: id },
    });
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.subjectsRepository.findOne({
      where: { subject_id: id },
    });
    if (!subject) {
      throw new Error('Subject not found');
    }
    const updatedSubject = Object.assign(subject, updateSubjectDto);
    return this.subjectsRepository.save(updatedSubject);
  }

  async remove(id: number) {
    const subject = await this.subjectsRepository.findOne({
      where: { subject_id: id },
    });

    // Actualizar los Detalle Curso asociados al Docente eliminada
    const teachersdetails = await this.teachersdetailRepository.find({
      where: { subject: subject.subject_id },
    });

    if (teachersdetails.length > 0) {
      for (const teachersdetail of teachersdetails) {
        teachersdetail.subject = null; // O asignar otro valor especial si lo deseas
        await this.teachersdetailRepository.save(teachersdetails);
      }
    }

    if (!subject) {
      throw new Error('Subject not found');
    }
    return this.subjectsRepository.remove(subject);
  }
}
