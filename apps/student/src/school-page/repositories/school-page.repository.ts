import { SchoolPageEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';

@InjectableRepository(SchoolPageEntity)
export class SchoolPageRepository extends AbstractRepository<SchoolPageEntity> {
  async findManyAndCount(studentId: number | null, skip: number, take: number) {
    const queryBuilder = this.createQueryBuilder('schoolPage').skip(skip).take(take);

    if (typeof studentId === 'number') {
      queryBuilder.leftJoinAndMapOne(
        'schoolPage.subscription',
        'schoolPage.subscriptions',
        'subscription',
        'subscription.studentId = :studentId AND subscription.schoolPageId = schoolPage.id',
        { studentId },
      );
    }

    return queryBuilder.getManyAndCount();
  }
}
