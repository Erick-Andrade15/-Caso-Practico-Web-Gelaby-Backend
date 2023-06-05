import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
    async sendForgotPasswordEmail(email: string, name: string, resetLink: string): Promise<boolean> {
    try {
      const transporter = nodemailer.createTransport({
        // Configura las opciones del servidor SMTP aquí
        // Ejemplo para Gmail:
        service: 'gmail',
        auth: {
          user: 'tu_correo@gmail.com',
          pass: 'tu_contraseña',
        },
      });

      const mailOptions = {
        from: 'tu_correo@gmail.com',
        to: email,
        subject: 'Recuperación de contraseña',
        html: `
                <h2>Hola ${name}</h2>
                <h3>Has solicitado restablecer tu contraseña</h3>
                <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
                <a href="${resetLink}">Restablecer contraseña</a>
              `,
      };

      await transporter.sendMail(mailOptions);
      return true; // El correo se envió correctamente
    } catch (error) {
      console.error(error);
      return false; // Ocurrió un error al enviar el correo
    }
  }
}
