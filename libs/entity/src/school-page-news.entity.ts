import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { AdminEntity } from './admin.entity';

@Entity({ name: 'school_page_news' })
export class SchoolPageNewsEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'varchar', length: 248 })
  title: string;

  @Column({ type: 'varchar', length: 1024 })
  contents: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @ManyToOne(() => AdminEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  writer: AdminEntity;

  @ManyToOne(() => AdminEntity, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  updater: AdminEntity | null;
}
