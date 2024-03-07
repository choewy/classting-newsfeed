import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { SchoolPageEntity } from './school-page.entity';

@Entity({ name: 'admin' })
export class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @Column({ type: 'varchar', length: 320, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToOne(() => SchoolPageEntity, (e) => e.admin, { cascade: ['insert', 'remove'] })
  @JoinTable()
  schoolPage: SchoolPageEntity;
}
