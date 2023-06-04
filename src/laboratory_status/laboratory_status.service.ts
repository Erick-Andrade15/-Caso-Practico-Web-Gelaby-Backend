import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLaboratoryStatusDto } from './dto/create-laboratory_status.dto';
import { UpdateLaboratoryStatusDto } from './dto/update-laboratory_status.dto';
import { LaboratoryStatus } from './entities/laboratory_status.entity';

@Injectable()
export class LaboratoryStatusService {
  constructor(
    @InjectRepository(LaboratoryStatus)
    private laboratoryStatusesRepository: Repository<LaboratoryStatus>,
  ) {}

  findAll() {
    return this.laboratoryStatusesRepository.find({
      relations: ['laboratory'],
      order: {
        lab_status_id: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.laboratoryStatusesRepository.findOne({
      relations: ['laboratory'],
      where: { lab_status_id: id },
    });
  }

  create(createLaboratoryStatusDto: CreateLaboratoryStatusDto) {
    const laboratoryStatus = this.laboratoryStatusesRepository.create(
      createLaboratoryStatusDto,
    );
    return this.laboratoryStatusesRepository.save(laboratoryStatus);
  }

  async update(
    id: number,
    updateLaboratoryStatusDto: UpdateLaboratoryStatusDto,
  ) {
    const laboratoryStatus = await this.laboratoryStatusesRepository.findOne({
      where: { lab_status_id: id },
    });
    if (!laboratoryStatus) {
      throw new Error('Laboratory status not found');
    }
    const updatedLaboratoryStatus = Object.assign(
      laboratoryStatus,
      updateLaboratoryStatusDto,
    );
    return this.laboratoryStatusesRepository.save(updatedLaboratoryStatus);
  }

  async remove(id: number) {
    const laboratoryStatus = await this.laboratoryStatusesRepository.findOne({
      where: { lab_status_id: id },
    });
    if (!laboratoryStatus) {
      throw new Error('Laboratory status not found');
    }

    return this.laboratoryStatusesRepository.remove(laboratoryStatus);
  }
}
