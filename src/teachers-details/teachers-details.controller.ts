import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeachersDetailsService } from './teachers-details.service';
import { CreateTeachersDetailDto } from './dto/create-teachers-detail.dto';
import { UpdateTeachersDetailDto } from './dto/update-teachers-detail.dto';

@Controller('teachers-details')
export class TeachersDetailsController {
  constructor(private readonly teachersDetailsService: TeachersDetailsService) {}

  @Post()
  create(@Body() createTeachersDetailDto: CreateTeachersDetailDto) {
    return this.teachersDetailsService.create(createTeachersDetailDto);
  }

  @Get()
  findAll() {
    return this.teachersDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.teachersDetailsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTeachersDetailDto: UpdateTeachersDetailDto) {
    return this.teachersDetailsService.update(id, updateTeachersDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.teachersDetailsService.remove(id);
  }
}

