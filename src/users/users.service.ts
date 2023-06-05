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

  findEmail(email: string) {
    return this.usersRepository.findOne({
      where: { user_email: email },
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
}
