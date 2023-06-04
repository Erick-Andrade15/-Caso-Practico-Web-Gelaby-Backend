import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LaboratoryStatusService } from './laboratory_status.service';
import { CreateLaboratoryStatusDto } from './dto/create-laboratory_status.dto';
import { UpdateLaboratoryStatusDto } from './dto/update-laboratory_status.dto';

@Controller('laboratory-status')
export class LaboratoryStatusController {
  constructor(
    private readonly laboratoryStatusService: LaboratoryStatusService,
  ) {}

  @Get()
  findAll() {
    return this.laboratoryStatusService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.laboratoryStatusService.findOne(id);
  }

  @Post()
  create(@Body() createLaboratoryStatusDto: CreateLaboratoryStatusDto) {
    return this.laboratoryStatusService.create(createLaboratoryStatusDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateLaboratoryStatusDto: UpdateLaboratoryStatusDto,
  ) {
    return this.laboratoryStatusService.update(id, updateLaboratoryStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.laboratoryStatusService.remove(id);
  }
}
