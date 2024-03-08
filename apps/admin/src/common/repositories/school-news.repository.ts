import { SchoolNewsEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';

@InjectableRepository(SchoolNewsEntity)
export class SchoolNewsRepository extends AbstractRepository<SchoolNewsEntity> {
  async findManyAndCountBySchoolPageId(schoolPageId: number, skip: number, take: number) {
    return this.findAndCount({
      where: { schoolPage: { id: schoolPageId } },
      order: { id: 'DESC' },
      skip,
      take,
    });
  }

  async findOneById(id: number) {
    return this.findOneBy({ id });
  }
}
