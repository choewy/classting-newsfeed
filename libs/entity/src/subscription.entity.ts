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
  subscription: boolean;

  @Column({ type: 'datetime', default: null })
  unsubscribedAt: Date | null;

  @CreateDateColumn()
  readonly subscribedAt: Date;

  @ManyToOne(() => StudentEntity, (e) => e.subscriptions, { onDelete: 'CASCADE' })
  @JoinColumn()
  student: StudentEntity;

  @ManyToOne(() => SchoolPageEntity, (e) => e.subscriptions, { onDelete: 'CASCADE' })
  @JoinColumn()
  schoolPage: SchoolPageEntity;
}
