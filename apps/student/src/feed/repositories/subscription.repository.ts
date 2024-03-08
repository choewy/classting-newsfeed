import { SubscriptionEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';

@InjectableRepository(SubscriptionEntity)
export class SubscriptionRepository extends AbstractRepository<SubscriptionEntity> {
  async findManyByStudentId(studentId: number) {
    return this.find({ where: { studentId } });
  }
}
