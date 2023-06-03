import { PartialType } from '@nestjs/mapped-types';
import { CreateTeachersDetailDto } from './create-teachers-detail.dto';

export class UpdateTeachersDetailDto extends PartialType(CreateTeachersDetailDto) {}
