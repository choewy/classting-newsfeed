import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import { AdminEntity } from './admin.entity';
import { StudentEntity } from './student.entity';

@Entity({ name: 'account' })
export class AccountEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'varchar', length: 320, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100 })
  password: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToOne(() => AdminEntity, (e) => e.account, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  admin: AdminEntity | null;

  @OneToOne(() => StudentEntity, (e) => e.account, { onDelete: 'CASCADE', nullable: true })
  @JoinColumn()
  student: StudentEntity | null;
}
