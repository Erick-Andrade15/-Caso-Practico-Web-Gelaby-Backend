import { Injectable } from '@nestjs/common';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Career } from './entities/career.entity';


@Injectable()
export class CareersService {

  constructor(
    @InjectRepository(Career)
    private careersRepository: Repository<Career>,
  ) {}


  create(createCareerDto: CreateCareerDto) {
    const subject = this.careersRepository.create(createCareerDto);
    return this.careersRepository.save(subject);
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
    const subject = await this.careersRepository.findOne({
      where: { career_id: id },
    });;
    if (!subject) {
      throw new Error('Subject not found');
    }
    const updatedSubject = Object.assign(subject, updateCareerDto);
    return this.careersRepository.save(updatedSubject);
  }

  async remove(id: number) {
    const subject = await this.careersRepository.findOne({
      where: { career_id: id },
    });
    if (!subject) {
      throw new Error('Subject not found');
    }
    return this.careersRepository.remove(subject);
  }
}
