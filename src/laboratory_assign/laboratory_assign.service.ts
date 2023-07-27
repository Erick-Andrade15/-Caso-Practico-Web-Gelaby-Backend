import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { CreateLaboratoryAssignDto } from './dto/create-laboratory_assign.dto';
import { UpdateLaboratoryAssignDto } from './dto/update-laboratory_assign.dto';
import { LaboratoryAssign } from './entities/laboratory_assign.entity';

@Injectable()
export class LaboratoryAssignService {
  constructor(
    @InjectRepository(LaboratoryAssign)
    private laboratoryAssignRepository: Repository<LaboratoryAssign>,
  ) {}

  creaSte(createLaboratoryAssignDto: CreateLaboratoryAssignDto) {
    const laboratoryAssign = this.laboratoryAssignRepository.create(
      createLaboratoryAssignDto,
    );
    return this.laboratoryAssignRepository.save(laboratoryAssign);
  }

  async create(createLaboratoryAssignDto: CreateLaboratoryAssignDto) {
    // Validación: Verificar si el profesor ya está asignado en otro laboratorio en la misma fecha
    const existingAssignment =
      await this.laboratoryAssignRepository.findOne({
        where: {
          lab_assign_date: createLaboratoryAssignDto.lab_assign_date,
          laboratory: createLaboratoryAssignDto.lab_id,
          teacher: createLaboratoryAssignDto.teacher_id,
        },
      });

    if (existingAssignment) {
      throw new ConflictException(
        'El laboratorio ya está asignado en esa fecha.',
      );
    }

    // Si el registro no existe, crea y guarda el nuevo registro
    const laboratoryAssign = this.laboratoryAssignRepository.create(
      createLaboratoryAssignDto,
    );
    return this.laboratoryAssignRepository.save(laboratoryAssign);
  }

  findAll() {
    return this.laboratoryAssignRepository.find({
      relations: ['laboratory', 'teacher'],
      order: {
        lab_assign_id: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.laboratoryAssignRepository.findOne({
      relations: ['laboratory', 'teacher'],
      where: { lab_assign_id: id },
    });
  }

  async update(
    id: number,
    updateLaboratoryAssignDto: UpdateLaboratoryAssignDto,
  ) {
    const laboratoryAssign = await this.laboratoryAssignRepository.findOne({
      where: { lab_assign_id: id },
    });
    if (!laboratoryAssign) {
      throw new Error('Laboratory assignment not found');
    }
    const updatedLaboratoryAssign = Object.assign(
      laboratoryAssign,
      updateLaboratoryAssignDto,
    );
    return this.laboratoryAssignRepository.save(updatedLaboratoryAssign);
  }

  async remove(id: number) {
    const laboratoryAssign = await this.laboratoryAssignRepository.findOne({
      where: { lab_assign_id: id },
    });
    if (!laboratoryAssign) {
      throw new Error('Laboratory assignment not found');
    }
    return this.laboratoryAssignRepository.remove(laboratoryAssign);
  }
}
