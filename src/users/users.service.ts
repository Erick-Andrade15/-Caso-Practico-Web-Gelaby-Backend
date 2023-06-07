import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOne({
      where: { user_id: id },
    });
  }

  findUsername(username: string) {
    return this.usersRepository.findOne({
      where: { user_username: username },
    });
  }

  findPassword(password: string) {
    return this.usersRepository.findOne({
      where: { user_password: password },
    });
  }

  create(createUserDto: CreateUserDto) {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne({
      where: { user_id: id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const updatedUser = Object.assign(user, updateUserDto);
    return this.usersRepository.save(updatedUser);
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne({
      where: { user_id: id },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return this.usersRepository.remove(user);
  }


  async saveResetToken(userId: number, resetToken: string): Promise<void> {
    // Encuentra el usuario en la base de datos por el userId
    const user = await this.usersRepository.findOne({
      where: { user_id: userId },
    });;

    if (user) {
      // Actualiza el campo del token de reset en el usuario
      user.user_password = resetToken;

      // Guarda los cambios en la base de datos
      await this.usersRepository.save(user);
    }
  }



}
