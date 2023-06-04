import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Laboratory } from 'src/laboratories/entities/laboratory.entity';

@Entity()
export class LaboratoryStatus {
  @PrimaryGeneratedColumn()
  lab_status_id: number;

  @Column()
  lab_status_detail: string;

  @Column()
  lab_status_date: string;

  @Column()
  lab_status_notes: string;

  @ManyToOne(() => Laboratory, { nullable: true })
  @JoinColumn({ name: 'lab_id' })
  laboratory: number;
}
