import { IsNumber, IsString, Length, Min } from 'class-validator';

export class CreateCareerDto {
    career_id: number;

    @IsString({ message: 'El nombre de la carrera debe ser una cadena de texto' })
    @Length(3, 20, { message: 'El nombre de la carrera debe tener entre 3 y 20 caracteres' })
    career_name : string;
    
    @IsString({ message: 'El acrónimo de la carrera debe ser una cadena de texto' })
    @Length(2, 5, { message: 'El acrónimo de la carrera debe tener entre 2 y 5 caracteres' })
    career_acronym : string;
  
    @IsNumber({}, { message: 'La duración de la carrera debe ser un número' })
    @Min(1, { message: 'La duración de la carrera debe ser mayor o igual a 1' })  
    career_duration : number;
}