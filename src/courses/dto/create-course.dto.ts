import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateCourseDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 20, { message: 'El nombre debe tener entre 3 y 20 caracteres' })
  course_name: string;

  @IsNumber({}, { message: 'El número de estudiantes debe ser un número' })
  @Min(0, { message: 'El número de estudiantes debe ser igual o mayor a 0' })
  course_students: number;

  @IsNumber({}, { message: 'La duración debe ser un número' })
  @Min(0, { message: 'La duración debe ser igual o mayor a 0' })
  course_duration: number;

  @IsNumber({}, { message: 'El ID de la carrera debe ser un número' })
  career_id: number;

  @IsString({ message: 'El paralelo debe ser una cadena de texto' })
  course_parallel: string;

  @IsString({ message: 'El turno debe ser una cadena de texto' })
  course_shift: string;
}
