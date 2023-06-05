import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column()
  user_fullname: string;

  @Column()
  user_username: string;

  @Column()
  user_email: string;

  @Column()
  user_password: string;
  
  @Column()
  user_role: string;
}
