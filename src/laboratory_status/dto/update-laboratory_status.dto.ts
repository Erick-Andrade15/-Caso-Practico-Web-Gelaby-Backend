import { PartialType } from '@nestjs/mapped-types';
import { CreateLaboratoryStatusDto } from './create-laboratory_status.dto';

export class UpdateLaboratoryStatusDto extends PartialType(CreateLaboratoryStatusDto) {}
