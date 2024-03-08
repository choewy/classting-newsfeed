import { SchoolNewsEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';

@InjectableRepository(SchoolNewsEntity)
export class SchoolNewsRepository extends AbstractRepository<SchoolNewsEntity> {
  async findOneByMoreThanOrEqualNow(schoolPageId: number) {
    return this.createQueryBuilder('news')
      .orderBy('news.id', 'DESC')
      .where('news.schoolPageId = :schoolPageId', { schoolPageId })
      .andWhere('news.hidden IS FALSE')
      .andWhere('news.createdAt >= NOW()')
      .getOne();
  }

  async findOneByLessThanOrEqualNow(schoolPageId: number) {
    return this.createQueryBuilder('news')
      .orderBy('news.id', 'DESC')
      .where('news.schoolPageId = :schoolPageId', { schoolPageId })
      .andWhere('news.hidden IS FALSE')
      .andWhere('news.createdAt <= NOW()')
      .getOne();
  }

  async findManyAndCount(schoolPageId: number, skip: number, take: number) {
    return this.findAndCount({
      where: { schoolPage: { id: schoolPageId }, hidden: false },
      order: { id: 'DESC' },
      skip,
      take,
    });
  }
}
