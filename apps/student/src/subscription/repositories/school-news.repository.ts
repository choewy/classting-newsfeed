import { SchoolNewsEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';

@InjectableRepository(SchoolNewsEntity)
export class SchoolNewsRepository extends AbstractRepository<SchoolNewsEntity> {
  async findManyAndCount(schoolPageId: number, skip: number, take: number) {
    return this.findAndCount({
      where: { schoolPage: { id: schoolPageId }, hidden: false },
      order: { id: 'DESC' },
      skip,
      take,
    });
  }
}
