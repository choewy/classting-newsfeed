import { existsSync, writeFileSync } from 'fs';

import { AdminEntity, SchoolNewsEntity, SchoolPageEntity, StudentEntity } from '@libs/entity';
import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { hashSync } from 'bcrypt';
import { DataSource } from 'typeorm';

@Injectable()
export class InitializerService implements OnApplicationBootstrap {
  constructor(private readonly dataSource: DataSource) {}

  async onApplicationBootstrap(): Promise<void> {
    const initialized = [process.env.PWD, '.initialize'].join('/');

    if (existsSync(initialized)) {
      return Logger.verbose('already initialized.');
    }

    await this.upsertAdmins();
    await this.upsertStudents();
    await this.upsertSchoolPages();
    await this.upsertSchoolNews();

    writeFileSync(initialized, String(new Date()), 'utf-8');

    return Logger.verbose('success initialized.');
  }

  private password = hashSync('password', 10);

  private async upsertAdmins() {
    const repo = this.dataSource.getRepository(AdminEntity);
    const rows: AdminEntity[] = [];

    for (let i = 1; i < 101; i++) {
      rows.push(
        repo.create({
          id: i,
          name: `관리자(${i})`,
          email: `admin_${i}@example.com`,
          password: this.password,
        }),
      );
    }

    await repo.upsert(rows, { conflictPaths: { id: true } });
  }

  private async upsertStudents() {
    const repo = this.dataSource.getRepository(StudentEntity);
    const rows: StudentEntity[] = [];

    for (let i = 1; i < 101; i++) {
      rows.push(
        repo.create({
          id: i,
          name: `학생(${i})`,
          email: `student_${i}@example.com`,
          password: this.password,
        }),
      );
    }

    await repo.upsert(rows, { conflictPaths: { id: true } });
  }

  private async upsertSchoolPages() {
    const repo = this.dataSource.getRepository(SchoolPageEntity);
    const rows: SchoolPageEntity[] = [];

    for (let i = 1; i < 101; i++) {
      rows.push(
        repo.create({
          id: i,
          name: `학교(${i})`,
          location: `대한민국`,
          admin: { id: i },
          schoolPageCount: { id: i },
        }),
      );
    }

    await repo.upsert(rows, { conflictPaths: { id: true } });
  }

  private async upsertSchoolNews() {
    const repo = this.dataSource.getRepository(SchoolNewsEntity);

    for (let i = 1; i < 101; i++) {
      const rows: SchoolNewsEntity[] = [];

      for (let j = 1; j < 1001; j++) {
        rows.push(
          repo.create({
            title: `학교(${i})의 소식(${j})`,
            contents: `학교(${i})의 소식(${j}) 입니다.`,
            hidden: false,
            schoolPage: { id: i },
          }),
        );
      }

      await repo.upsert(rows, { conflictPaths: { id: true } });
    }
  }
}
