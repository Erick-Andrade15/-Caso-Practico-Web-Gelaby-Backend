import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>,
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
    });;
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
    if (!subject) {
      throw new Error('Subject not found');
    }
    return this.subjectsRepository.remove(subject);
  }
}
