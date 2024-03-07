import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { SchoolEntity } from './school.entity';

@Entity('school_storage')
export class SchoolStorageEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'bigint', unsigned: true, default: 0 })
  subscribers: bigint;

  @OneToOne(() => SchoolEntity, (e) => e.schoolStorage, { onDelete: 'CASCADE' })
  @JoinColumn()
  school: SchoolEntity;
}
