import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SchoolEntity } from './school.entity';

@Entity('school_count')
export class SchoolCountEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  subscribers: number;

  @OneToOne(() => SchoolEntity, (e) => e.count, { onDelete: 'CASCADE' })
  @JoinColumn()
  school: SchoolEntity;
}
