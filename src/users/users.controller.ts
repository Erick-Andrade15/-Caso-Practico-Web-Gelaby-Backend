import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EmailService } from './email.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly emailService: EmailService,
  ) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(id);
  }

  @Get('username/:username')
  findByUsername(@Param('username') username: string) {
    return this.usersService.findUsername(username);
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    console.log("AAAAAAAAAAAAAAAA")
    const user = await this.usersService.findEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Genera un token de restablecimiento de contraseña
    //const resetToken = await this.generateResetToken(user.user_id);

    // Guarda el token en la base de datos para el usuario
    //await this.usersService.saveResetToken(user.user_id, resetToken);

    // Genera el enlace de restablecimiento de contraseña
    //const resetLink = `https://example.com/reset-password?token=${resetToken}`;

    // Envía el correo electrónico de restablecimiento de contraseña utilizando el servicio de correo electrónico
    const emailSent = await this.emailService.sendForgotPasswordEmail(
      user.user_email,
      user.user_username,
      user.user_password,
    );

    if (emailSent) {
      console.log('El correo electrónico se envió correctamente');
    } else {
      console.log('Ocurrió un error al enviar el correo electrónico');
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(id);
  }
}
