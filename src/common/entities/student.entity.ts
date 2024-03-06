import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AccountEntity } from './account.entity';
import { SubscribeEntity } from './subscribe.entity';

@Entity({ name: 'student' })
export class StudentEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'int', unsigned: true })
  readonly id: number;

  @Column({ type: 'varchar', length: 20 })
  name: string;

  @CreateDateColumn()
  readonly createdAt: Date;

  @UpdateDateColumn()
  readonly updatedAt: Date;

  @OneToOne(() => AccountEntity, (e) => e.student, { cascade: true })
  @JoinTable()
  account: AccountEntity;

  @OneToMany(() => SubscribeEntity, (e) => e.student, { cascade: true })
  @JoinTable()
  subscribes: SubscribeEntity[];
}
