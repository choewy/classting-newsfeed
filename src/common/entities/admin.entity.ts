import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AccountEntity } from './account.entity';
import { SchoolNewsEntity } from './school-news.entity';
import { SchoolEntity } from './school.entity';

@Entity({ name: 'admin' })
export class AdminEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToOne(() => AccountEntity, (e) => e.admin, { cascade: true })
  @JoinTable()
  account: AccountEntity;

  @ManyToOne(() => SchoolEntity, (e) => e.admins, { onDelete: 'SET NULL', nullable: true })
  @JoinColumn()
  school: SchoolEntity | null;

  @OneToMany(() => SchoolNewsEntity, (e) => e.writer, { cascade: true })
  @JoinTable()
  writtenSchoolNews: SchoolNewsEntity[];
}
