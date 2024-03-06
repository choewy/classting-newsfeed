import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { SchoolEntity } from './school.entity';
import { StudentEntity } from './student.entity';

export enum SubscribeStatus {
  Active = 1,
  Cancel = 0,
}

@Entity({ name: 'subscribe' })
export class SubscribeEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  readonly id: bigint;

  @Column({ type: 'tinyint', unsigned: true })
  status: SubscribeStatus;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @ManyToOne(() => StudentEntity, (e) => e.subscribes, { onDelete: 'CASCADE' })
  @JoinColumn()
  student: StudentEntity;

  @ManyToOne(() => SchoolEntity, (e) => e.subscribers, { onDelete: 'CASCADE' })
  @JoinColumn()
  school: SchoolEntity;
}
