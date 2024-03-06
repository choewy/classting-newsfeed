import { AdminEntity, SchoolEntity } from '@common/entities';
import { CreateSchoolCommand } from '@domain/school/commands';
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
      {
        enableCircularCheck: true,
        enableImplicitConversion: true,
      },
    );
  }

  static School(replaceVelues?: DeepPartial<SchoolEntity>) {
    return plainToInstance(SchoolEntity, {
      id: 1,
      name: 'school',
      location: 'location',
      ...replaceVelues,
    });
  }

  static CreateSchoolCommand(replaceValues?: Partial<CreateSchoolCommand>) {
    return plainToInstance(CreateSchoolCommand, {
      name: 'school',
      location: 'location',
      ...replaceValues,
    });
  }
}
