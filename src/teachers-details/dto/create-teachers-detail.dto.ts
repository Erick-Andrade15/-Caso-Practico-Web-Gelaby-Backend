import { IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateTeachersDetailDto {
  @IsDateString({}, { message: 'La fecha debe ser una cadena de texto con formato de fecha' })
  teacher_detail_date: string;

  @IsString({ message: 'La hora de inicio debe ser una cadena de texto' })
  teacher_detail_start_time: string;

  @IsString({ message: 'La hora de fin debe ser una cadena de texto' })
  teacher_detail_end_time: string;

  @IsNumber({}, { message: 'El ID del profesor debe ser un número' })
  teacher_id: number;

  @IsNumber({}, { message: 'El ID de la asignatura debe ser un número' })
  subject_id: number;
  
  @IsNumber({}, { message: 'El ID del curso debe ser un número' })
  course_id: number;
}
