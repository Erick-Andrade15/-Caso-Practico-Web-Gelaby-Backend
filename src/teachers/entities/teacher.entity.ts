import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  teacher_id: number;

  @Column()
  teacher_identification: string;

  @Column()
  teacher_first_name: string;

  @Column()
  teacher_last_name: string;

  @Column()
  teacher_institutional_email: string;

  @Column()
  teacher_phone_number: string;
}
