import { AdminEntity, SchoolEntity, SchoolNewsEntity } from '@common/entities';
import { CreateSchoolCommand, CreateSchoolNewsCommand, UpdateSchoolNewsCommand } from '@domain/school/commands';
import { plainToInstance } from 'class-transformer';
import { DeepPartial } from 'typeorm';

export class SchoolFixture {
  static Admin(replaceValues?: DeepPartial<AdminEntity>) {
    return plainToInstance(
      AdminEntity,
      {
        id: 1,
        name: 'admin',
        ...replaceValues,
      },
      { enableCircularCheck: true, enableImplicitConversion: true },
    );
  }

  static School(replaceVelues?: DeepPartial<SchoolEntity>) {
    return plainToInstance(
      SchoolEntity,
      {
        id: 1,
        name: 'school',
        location: 'location',
        ...replaceVelues,
      },
      { enableCircularCheck: true, enableImplicitConversion: true },
    );
  }

  static SchoolNews(replaceVelues?: DeepPartial<SchoolNewsEntity>) {
    return plainToInstance(
      SchoolNewsEntity,
      {
        id: 1,
        title: 'school news',
        contents: 'school news contents',
        school: this.School(),
        writer: this.Admin(),
        updater: null,
        ...replaceVelues,
      },
      { enableCircularCheck: true, enableImplicitConversion: true },
    );
  }

  static CreateSchoolCommand(replaceValues?: Partial<CreateSchoolCommand>) {
    return plainToInstance(
      CreateSchoolCommand,
      {
        name: 'school',
        location: 'location',
        ...replaceValues,
      },
      { enableCircularCheck: true, enableImplicitConversion: true },
    );
  }

  static CreateSchoolNewsCommand(replaceValues?: Partial<CreateSchoolNewsCommand>) {
    return plainToInstance(
      CreateSchoolNewsCommand,
      {
        title: 'school news',
        contents: 'school news contents',
        ...replaceValues,
      },
      { enableCircularCheck: true, enableImplicitConversion: true },
    );
  }

  static UpdateSchoolNewsCommand(replaceValues?: Partial<UpdateSchoolNewsCommand>) {
    return plainToInstance(
      CreateSchoolNewsCommand,
      {
        title: 'school news(updated)',
        contents: 'school news contents(updated)',
        ...replaceValues,
      },
      { enableCircularCheck: true, enableImplicitConversion: true },
    );
  }
}
