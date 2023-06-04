import { IsNumber, IsString } from 'class-validator';

export class CreateLaboratoryStatusDto {
  @IsString({ message: 'El detalle del estado del laboratorio debe ser una cadena de texto' })
  lab_status_detail: string;

  @IsString({ message: 'La fecha del estado del laboratorio debe ser una cadena de texto' })
  lab_status_date: string;

  @IsString({ message: 'Las notas del estado del laboratorio deben ser una cadena de texto' })
  lab_status_notes: string;

  @IsNumber({}, { message: 'El ID de la carrera debe ser un número' })
  lab_id: number;
}
