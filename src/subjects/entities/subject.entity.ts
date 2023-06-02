import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  subject_id: number;

  @Column()
  subject_name : string;
}
