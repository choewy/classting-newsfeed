import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { SchoolPageEntity } from './school-page.entity';

@Entity({ name: 'school_news' })
export class SchoolNewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'varchar', length: 248 })
  title: string;

  @Column({ type: 'varchar', length: 1024 })
  contents: string;

  @Column({ type: 'boolean', default: false })
  hidden: boolean;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @ManyToOne(() => SchoolPageEntity, (e) => e.schoolNews, { onDelete: 'CASCADE', eager: true })
  @JoinColumn()
  schoolPage: SchoolPageEntity;
}
