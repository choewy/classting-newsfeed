import { SchoolNewsEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';

@InjectableRepository(SchoolNewsEntity)
export class SchoolNewsRepository extends AbstractRepository<SchoolNewsEntity> {
  async findManyAndCountBySchoolPage(schoolPageId: number, skip: number, take: number) {
    return this.findAndCount({
      where: { schoolPage: { id: schoolPageId }, hidden: false },
      order: { id: 'DESC' },
      skip,
      take,
    });
  }

  async findManyAndCountByStudent(studentId: number, skip: number, take: number) {
    return this.createQueryBuilder('news')
      .skip(skip)
      .take(take)
      .orderBy('news.id', 'DESC')
      .innerJoinAndMapOne('news.schoolPage', 'news.schoolPage', 'page')
      .innerJoinAndMapOne('page.schoolPageCount', 'page.schoolPageCount', 'pageCount')
      .innerJoin('page.subscriptions', 'sub', 'sub.studentId = :studentId AND sub.schoolPageId = page.id', {
        studentId,
      })
      .where('news.hidden IS FALSE')
      .andWhere('news.createdAt >= sub.subscribedAt')
      .andWhere('IF(sub.unsubscribedAt IS NULL, 1, news.createdAt <= sub.unsubscribedAt)')
      .getManyAndCount();
  }

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
}
