import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { Subject } from 'src/subjects/entities/subject.entity';
import { Course } from 'src/courses/entities/course.entity';

@Entity()
export class TeachersDetail {
  @PrimaryGeneratedColumn()
  teacher_detail_id: number;

  @Column()
  teacher_detail_date: string;

  @Column()
  teacher_detail_start_time: string;

  @Column()
  teacher_detail_end_time: string;

  @ManyToOne(() => Teacher, { nullable: true })
  @JoinColumn({ name: 'teacher_id' })
  teacher: number;

  @ManyToOne(() => Subject, { nullable: true })
  @JoinColumn({ name: 'subject_id' })
  subject: number;

  @ManyToOne(() => Course, { nullable: true })
  @JoinColumn({ name: 'course_id' })
  course: number;
}

