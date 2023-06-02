import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Career {
  @PrimaryGeneratedColumn()
  career_id: number;

  @Column()
  career_name : string;

  @Column()
  career_acronym : string;

  @Column()
  career_duration : number;
}