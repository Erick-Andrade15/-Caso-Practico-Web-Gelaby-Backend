import { Module } from '@nestjs/common';
import { LaboratoryAssignService } from './laboratory_assign.service';
import { LaboratoryAssignController } from './laboratory_assign.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratoryAssign } from './entities/laboratory_assign.entity';
import { Laboratory } from 'src/laboratories/entities/laboratory.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LaboratoryAssign, Laboratory, Teacher])],
  controllers: [LaboratoryAssignController],
  providers: [LaboratoryAssignService],
  exports: [LaboratoryAssignService],
})
export class LaboratoryAssignModule {}
