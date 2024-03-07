import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AdminEntity } from './admin.entity';
import { SchoolPageCountEntity } from './school-page-count.entity';
import { SubscriptionEntity } from './subscription.entity';

@Entity({ name: 'school_page' })
export class SchoolPageEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  location: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToOne(() => AdminEntity, (e) => e.schoolPage, { onDelete: 'CASCADE' })
  @JoinColumn()
  admin: AdminEntity;

  @OneToOne(() => SchoolPageCountEntity, (e) => e.schoolPage, { cascade: ['insert', 'remove'], eager: true })
  @JoinTable()
  schoolPageCount: SchoolPageCountEntity;

  @OneToMany(() => SubscriptionEntity, (e) => e.schoolPage, { cascade: ['remove'] })
  @JoinTable()
  subscriptions: SubscriptionEntity[];
}
