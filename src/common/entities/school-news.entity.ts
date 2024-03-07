import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { AdminEntity } from './admin.entity';
import { SchoolEntity } from './school.entity';

@Entity({ name: 'school_news' })
export class SchoolNewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  readonly id: bigint;

  @Column({ type: 'varchar', length: 248 })
  title: string;

  @Column({ type: 'varchar', length: 1024 })
  contents: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @ManyToOne(() => SchoolEntity, (e) => e.schoolNews, { onDelete: 'CASCADE' })
  @JoinColumn()
  school: SchoolEntity;

  @ManyToOne(() => AdminEntity, (e) => e.createdSchoolNews, { onDelete: 'CASCADE' })
  @JoinColumn()
  writer: AdminEntity;

  @ManyToOne(() => AdminEntity, (e) => e.updatedSchoolNews, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  updater: AdminEntity | null;
}
