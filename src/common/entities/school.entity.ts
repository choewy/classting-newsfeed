import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AdminEntity } from './admin.entity';
import { SchoolNewsEntity } from './school-news.entity';
import { SchoolCountEntity } from './school-storage.entity';
import { SubscribeEntity } from './subscribe.entity';

@Entity({ name: 'school' })
@Index('school_idx_name_location', ['name', 'location'])
export class SchoolEntity extends BaseEntity {
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

  @OneToOne(() => SchoolCountEntity, (e) => e.school, { cascade: true, eager: true })
  @JoinTable()
  count: SchoolCountEntity;

  @OneToOne(() => AdminEntity, (e) => e.school, { onDelete: 'CASCADE' })
  @JoinColumn()
  admin: AdminEntity;

  @OneToMany(() => SchoolNewsEntity, (e) => e.school, { cascade: true })
  @JoinTable()
  schoolNews: SchoolNewsEntity[];

  @OneToMany(() => SubscribeEntity, (e) => e.school, { cascade: true })
  @JoinTable()
  subscribers: SubscribeEntity[];
}
