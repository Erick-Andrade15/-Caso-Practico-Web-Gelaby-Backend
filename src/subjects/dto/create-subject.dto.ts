import { IsString, Length } from 'class-validator';

export class CreateSubjectDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 20, { message: 'El nombre debe tener entre 3 y 20 caracteres' })
  subject_name: string;

  // Otros campos necesarios para crear un tema
}

  