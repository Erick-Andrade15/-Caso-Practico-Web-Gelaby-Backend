import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateTeacherDto {
  @IsString({ message: 'El número de identificación debe ser una cadena de texto' })
  teacher_identification: string;

  @IsString({ message: 'El primer nombre debe ser una cadena de texto' })
  teacher_first_name: string;

  @IsString({ message: 'El apellido debe ser una cadena de texto' })
  teacher_last_name: string;

  @IsEmail({}, { message: 'El correo electrónico institucional no es válido' })
  teacher_institutional_email: string;

  @IsPhoneNumber('EC', { message: 'El número de teléfono no es válido' })
  teacher_phone_number: string;
}
