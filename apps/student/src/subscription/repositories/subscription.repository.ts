import { SubscriptionEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';

@InjectableRepository(SubscriptionEntity)
export class SubscriptionRepository extends AbstractRepository<SubscriptionEntity> {
  async findManyAndCount(studentId: number, skip: number, take: number) {
    return this.findAndCount({
      relations: { schoolPage: true },
      where: { student: { id: studentId } },
      skip,
      take,
    });
  }
}
