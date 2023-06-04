import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateLaboratoryDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  lab_name: string;

  @IsNumber({}, { message: 'El número de computadoras debe ser un número' })
  @Min(0, { message: 'El número de computadoras debe ser igual o mayor a 0' })
  lab_computers: number;

  @IsString({ message: 'La descripción debe ser una cadena de texto' })
  lab_description: string;
}
