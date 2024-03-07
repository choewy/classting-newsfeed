import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

import { SchoolNewsEntity } from './school-news.entity';
import { SchoolEntity } from './school.entity';
import { StudentEntity } from './student.entity';

@Entity({ name: 'subscribe' })
@Index('subcribe_idx_student_school', ['studentId', 'schoolId'])
export class SubscribeEntity extends BaseEntity {
  @PrimaryColumn({ type: 'int', unsigned: true })
  studentId: number;

  @PrimaryColumn({ type: 'int', unsigned: true })
  schoolId: number;

  @Column({ type: 'boolean' })
  status: boolean;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @ManyToOne(() => StudentEntity, (e) => e.subscribes, { onDelete: 'CASCADE' })
  @JoinColumn()
  student: StudentEntity;

  @ManyToOne(() => SchoolEntity, (e) => e.subscribers, { onDelete: 'CASCADE' })
  @JoinColumn()
  school: SchoolEntity;

  @ManyToOne(() => SchoolNewsEntity, (e) => e.subscriber, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  lastSchoolNews: SchoolNewsEntity | null;
}
