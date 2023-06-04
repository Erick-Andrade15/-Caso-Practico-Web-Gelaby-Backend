import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LaboratoryAssignService } from './laboratory_assign.service';
import { CreateLaboratoryAssignDto } from './dto/create-laboratory_assign.dto';
import { UpdateLaboratoryAssignDto } from './dto/update-laboratory_assign.dto';

@Controller('laboratory-assign')
export class LaboratoryAssignController {
  constructor(
    private readonly laboratoryAssignService: LaboratoryAssignService,
  ) {}

  @Get()
  findAll() {
    return this.laboratoryAssignService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.laboratoryAssignService.findOne(id);
  }

  @Post()
  create(@Body() createLaboratoryAssignDto: CreateLaboratoryAssignDto) {
    return this.laboratoryAssignService.create(createLaboratoryAssignDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateLaboratoryAssignDto: UpdateLaboratoryAssignDto,
  ) {
    return this.laboratoryAssignService.update(id, updateLaboratoryAssignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.laboratoryAssignService.remove(id);
  }
}
