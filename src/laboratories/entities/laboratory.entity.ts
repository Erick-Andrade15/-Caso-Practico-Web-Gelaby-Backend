import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Laboratory {
  @PrimaryGeneratedColumn()
  lab_id: number;

  @Column()
  lab_name: string;

  @Column()
  lab_computers: number;
  
  @Column()
  lab_description: string;
}
