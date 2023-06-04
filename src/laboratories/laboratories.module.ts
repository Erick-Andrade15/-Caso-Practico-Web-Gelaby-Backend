import { Module } from '@nestjs/common';
import { LaboratoriesService } from './laboratories.service';
import { LaboratoriesController } from './laboratories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Laboratory } from './entities/laboratory.entity';
import { LaboratoryAssign } from 'src/laboratory_assign/entities/laboratory_assign.entity';
import { LaboratoryStatus } from 'src/laboratory_status/entities/laboratory_status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Laboratory, LaboratoryAssign, LaboratoryStatus])],
  controllers: [LaboratoriesController],
  providers: [LaboratoriesService],
  exports: [LaboratoriesService],
})
export class LaboratoriesModule {}
