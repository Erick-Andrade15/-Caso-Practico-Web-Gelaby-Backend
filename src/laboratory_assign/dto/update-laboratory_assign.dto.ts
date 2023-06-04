import { PartialType } from '@nestjs/mapped-types';
import { CreateLaboratoryAssignDto } from './create-laboratory_assign.dto';

export class UpdateLaboratoryAssignDto extends PartialType(CreateLaboratoryAssignDto) {}
