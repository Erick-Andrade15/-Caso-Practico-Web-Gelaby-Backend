import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'El nombre completo debe ser una cadena de texto' })
  user_fullname: string;

  @IsString({ message: 'El nombre de usuario debe ser una cadena de texto' })
  user_username: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  user_email: string;

  @IsString({ message: 'La contraseña debe ser una cadena de texto' })
  @Length(6, 20, { message: 'La contraseña debe tener entre 6 y 20 caracteres' })
  user_password: string;

  @IsString({ message: 'El rol debe ser una cadena de texto' })
  user_role: string;
}
