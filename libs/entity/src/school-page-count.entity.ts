import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SchoolPageEntity } from './school-page.entity';

@Entity({ name: 'school_page_count' })
export class SchoolPageCountEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  subscribers: number;

  @OneToOne(() => SchoolPageEntity, (e) => e.schoolPageCount, { onDelete: 'CASCADE' })
  @JoinColumn()
  schoolPage: SchoolPageEntity;
}
