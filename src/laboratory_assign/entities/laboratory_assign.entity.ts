import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Laboratory } from 'src/laboratories/entities/laboratory.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Entity()
export class LaboratoryAssign {
  @PrimaryGeneratedColumn()
  lab_assign_id: number;

  @Column()
  lab_assign_description: string;

  @Column()
  lab_assign_date: string;

  @ManyToOne(() => Laboratory, { nullable: true })
  @JoinColumn({ name: 'lab_id' })
  laboratory: number;

  @ManyToOne(() => Teacher, { nullable: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher: number;
}
