import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { SchoolPageEntity } from './school-page.entity';
import { StudentEntity } from './student.entity';

@Entity({ name: 'subscription' })
export class SubscriptionEntity extends BaseEntity {
  @PrimaryColumn({ type: 'int', unsigned: true, primary: false })
  studentId: number;

  @PrimaryColumn({ type: 'int', unsigned: true, primary: false })
  schoolPageId: number;

  @Column({ type: 'boolean' })
  status: boolean;

  @CreateDateColumn()
  readonly subscribedAt: Date;

  @Column({ type: 'timestamp', default: null })
  readonly unsubscribedAt: Date | null;

  @ManyToOne(() => StudentEntity, (e) => e.subscriptions, { onDelete: 'CASCADE' })
  @JoinColumn()
  student: StudentEntity;

  @ManyToOne(() => SchoolPageEntity, (e) => e.subscriptions, { onDelete: 'CASCADE' })
  @JoinColumn()
  schoolPage: SchoolPageEntity;
}
