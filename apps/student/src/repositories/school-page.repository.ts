import { SchoolPageEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';

@InjectableRepository(SchoolPageEntity)
export class SchoolPageRepository extends AbstractRepository<SchoolPageEntity> {
  async existsById(id: number) {
    return this.existsBy({ id });
  }

  async findManyAndCount(studentId: number | null, skip: number, take: number) {
    const queryBuilder = this.createQueryBuilder('schoolPage').skip(skip).take(take);

    if (typeof studentId === 'number') {
      queryBuilder.leftJoinAndMapOne(
        'schoolPage.subscription',
        'schoolPage.subscriptions',
        'sub',
        'sub.studentId = :studentId AND sub.schoolPageId = schoolPage.id AND sub.status = TRUE',
        { studentId },
      );
    }

    return queryBuilder.getManyAndCount();
  }
}
