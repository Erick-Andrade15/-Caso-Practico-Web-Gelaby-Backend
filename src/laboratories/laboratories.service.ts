import { Injectable } from '@nestjs/common';
import { CreateLaboratoryDto } from './dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Laboratory } from './entities/laboratory.entity';
import { LaboratoryAssign } from 'src/laboratory_assign/entities/laboratory_assign.entity';
import { LaboratoryStatus } from 'src/laboratory_status/entities/laboratory_status.entity';

@Injectable()
export class LaboratoriesService {
  constructor(
    @InjectRepository(Laboratory)
    private laboratoriesRepository: Repository<Laboratory>,
    @InjectRepository(LaboratoryAssign) // Inyecta el repositorio ASSING LABORATORY
    private laboratoryassignRepository: Repository<LaboratoryAssign>,
    @InjectRepository(LaboratoryStatus) // Inyecta el repositorio STATUS LABORATORY
    private laboratorystatusRepository: Repository<LaboratoryStatus>,
  ) {}

  findAll() {
    return this.laboratoriesRepository.find({
      order: {
        lab_id: 'ASC',
      },
    });
  }

  findOne(id: number) {
    return this.laboratoriesRepository.findOne({
      where: { lab_id: id },
    });
  }

  create(createLaboratoryDto: CreateLaboratoryDto) {
    const laboratory = this.laboratoriesRepository.create(createLaboratoryDto);
    return this.laboratoriesRepository.save(laboratory);
  }

  async update(id: number, updateLaboratoryDto: UpdateLaboratoryDto) {
    const laboratory = await this.laboratoriesRepository.findOne({
      where: { lab_id: id },
    });
    if (!laboratory) {
      throw new Error('Laboratory not found');
    }
    const updatedLaboratory = Object.assign(laboratory, updateLaboratoryDto);
    return this.laboratoriesRepository.save(updatedLaboratory);
  }

  async remove(id: number) {
    const laboratory = await this.laboratoriesRepository.findOne({
      where: { lab_id: id },
    });

    if (!laboratory) {
      throw new Error('Laboratory not found');
    }

    // Actualizar los Asing Laboratory asociados al Laboratorio eliminada
    const laboratoriesassigns = await this.laboratoryassignRepository.find({
      where: { laboratory: laboratory.lab_id },
    });

    if (laboratoriesassigns.length > 0) {
      for (const laboratoryassign of laboratoriesassigns) {
        laboratoryassign.laboratory = null; // O asignar otro valor especial si lo deseas
        await this.laboratoryassignRepository.save(laboratoriesassigns);
      }
    }

    // Actualizar los status Laboratory asociados al Laboratorio eliminada
    const laboratoriestatus = await this.laboratoryassignRepository.find({
      where: { laboratory: laboratory.lab_id },
    });

    if (laboratoriestatus.length > 0) {
      for (const laboratorystatus of laboratoriestatus) {
        laboratorystatus.laboratory = null; // O asignar otro valor especial si lo deseas
        await this.laboratoryassignRepository.save(laboratoriestatus);
      }
    }

    return this.laboratoriesRepository.remove(laboratory);
  }
}
