import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EmailService {
  async sendForgotPasswordEmail(
    email: string,
    name: string,
    resetLink: string,
  ): Promise<boolean> {
    try {
      const transporter = nodemailer.createTransport({
        // Configura las opciones del servidor SMTP aquí
        // Ejemplo para Gmail:
        service: 'gmail',
        auth: {
          user: 'webgelaby@gmail.com',
          pass: 'aotrsbmeqttckygj',
        },
      });

      const fromName = '👋 Web Gelaby';
      const fromEmail = 'webgelaby@gmail.com';

      const mailOptions = {
        from: `${fromName} <${fromEmail}>`,
        to: email,
        subject: 'Recuperación de contraseña',
        html: `
          <h2>Hola ${name},</h2>
          <h3>Has solicitado restablecer tu contraseña</h3>
          <p>Por favor, haz clic en el siguiente enlace para crear una nueva contraseña:</p>
          <a href="${resetLink}" style="display:inline-block;background-color:#4CAF50;color:#ffffff;padding:10px 15px;text-decoration:none;border-radius:4px;">Restablecer contraseña</a>
          <p>Si no has solicitado restablecer tu contraseña, puedes ignorar este correo electrónico.</p>
          <p>Saludos,</p>
          <p>Equipo de Web Gelaby</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      return true; // El correo se envió correctamente
    } catch (error) {
      console.error(error);
      return false; // Ocurrió un error al enviar el correo
    }
  }

  async generateResetToken(): Promise<string> {
    const resetToken = uuidv4();

    // Aquí puedes realizar cualquier lógica adicional que necesites,
    // como el cifrado del token antes de guardarlo o la configuración de una fecha de expiración.

    return resetToken;
  }


}
