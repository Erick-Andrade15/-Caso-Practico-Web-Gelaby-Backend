import { Career } from 'src/careers/entities/career.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  course_id: number;

  @Column()
  course_name : string;

  @Column()
  course_students : number;

  @Column()
  course_duration : number;

  @ManyToOne(() => Career, { nullable: true })
  @JoinColumn({ name: 'career_id' })
  career: number;

  @Column()
  course_parallel : string;

  @Column()
  course_shift : string;
}

