export class CreateLaboratorSyAssignDto {}

import { IsNumber, IsString } from 'class-validator';

export class CreateLaboratoryAssignDto {
  @IsString({ message: 'La descripción de la asignación de laboratorio debe ser una cadena de texto' })
  lab_assign_description: string;

  @IsString({ message: 'La fecha de la asignación de laboratorio debe ser una cadena de texto' })
  lab_assign_date: string;

  @IsNumber({}, { message: 'El ID de la laboratory debe ser un número' })
  lab_id: number;
  
  @IsNumber({}, { message: 'El ID de la teacher debe ser un número' })
  teacher_id: number;
}

