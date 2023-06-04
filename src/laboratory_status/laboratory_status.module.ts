import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LaboratoryStatusController } from './laboratory_status.controller';
import { LaboratoryStatusService } from './laboratory_status.service';
import { LaboratoryStatus } from './entities/laboratory_status.entity';
import { Laboratory } from 'src/laboratories/entities/laboratory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LaboratoryStatus, Laboratory])],
  controllers: [LaboratoryStatusController],
  providers: [LaboratoryStatusService],
  exports: [LaboratoryStatusService],
})
export class LaboratoryStatusModule {}
