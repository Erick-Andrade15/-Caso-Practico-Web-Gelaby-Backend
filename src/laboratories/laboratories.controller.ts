import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LaboratoriesService } from './laboratories.service';
import { CreateLaboratoryDto } from './dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';

@Controller('laboratories')
export class LaboratoriesController {
  constructor(private readonly laboratoriesService: LaboratoriesService) {}

  @Get()
  findAll() {
    return this.laboratoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.laboratoriesService.findOne(id);
  }

  @Post()
  create(@Body() createLaboratoryDto: CreateLaboratoryDto) {
    return this.laboratoriesService.create(createLaboratoryDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateLaboratoryDto: UpdateLaboratoryDto,
  ) {
    return this.laboratoriesService.update(id, updateLaboratoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.laboratoriesService.remove(id);
  }
}
