import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateSubjectDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto' })
  @Length(3, 20, { message: 'El nombre debe tener entre 3 y 20 caracteres' })
  subject_name: string;

  @IsNumber({}, { message: 'Los créditos deben ser un número' })
  @Min(0, { message: 'Los créditos deben ser igual o mayores a 0' })
  subject_credits : number;
}

  