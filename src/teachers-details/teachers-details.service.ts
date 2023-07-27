import { ConflictException, Injectable } from '@nestjs/common';
import { CreateTeachersDetailDto } from './dto/create-teachers-detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeachersDetail } from './entities/teachers-detail.entity';
import { UpdateTeachersDetailDto } from './dto/update-teachers-detail.dto';

@Injectable()
export class TeachersDetailsService {
  constructor(
    @InjectRepository(TeachersDetail)
    private teachersDetailsRepository: Repository<TeachersDetail>,
  ) {}

  findAll() {
    return this.teachersDetailsRepository.find({
      relations: ['teacher', 'subject', 'course'],
      order: {
        teacher_detail_id: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.teachersDetailsRepository.findOne({
      where: { teacher_detail_id: id },
      relations: ['teacher', 'subject', 'course'],
    });
  }

  async create(createTeachersDetailDto: CreateTeachersDetailDto) {
    // Realizar la validación para evitar detalles duplicados
    const existingDetail = await this.teachersDetailsRepository.findOne({
      where: {
        teacher_detail_date: createTeachersDetailDto.teacher_detail_date,
        teacher: createTeachersDetailDto.teacher_id,
        subject: createTeachersDetailDto.subject_id,
      },
    });

    if (existingDetail) {
      throw new ConflictException(
        'El horario del profesor se superpone con otro detalle existente en ese día.',
      );
    }

    const teachersDetail = this.teachersDetailsRepository.create(
      createTeachersDetailDto,
    );
    return this.teachersDetailsRepository.save(teachersDetail);
  }

  async update(id: number, updateTeachersDetailDto: UpdateTeachersDetailDto) {
    const teachersDetail = await this.teachersDetailsRepository.findOne({
      where: { teacher_detail_id: id },
    });
    if (!teachersDetail) {
      throw new Error('Teacher Detail not found');
    }
    const updatedTeachersDetail = Object.assign(
      teachersDetail,
      updateTeachersDetailDto,
    );
    return this.teachersDetailsRepository.save(updatedTeachersDetail);
  }

  async remove(id: number) {
    const teachersDetail = await this.teachersDetailsRepository.findOne({
      where: { teacher_detail_id: id },
    });
    if (!teachersDetail) {
      throw new Error('Teacher Detail not found');
    }
    return this.teachersDetailsRepository.remove(teachersDetail);
  }
}
