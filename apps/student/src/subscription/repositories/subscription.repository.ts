import { SchoolPageCountEntity, SubscriptionEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';

@InjectableRepository(SubscriptionEntity)
export class SubscriptionRepository extends AbstractRepository<SubscriptionEntity> {
  async existsByStudentAndSchoolPage(studentId: number, schoolPageId: number) {
    return this.existsBy({ studentId, schoolPageId, status: true });
  }

  async findManyAndCount(studentId: number, skip: number, take: number) {
    return this.findAndCount({
      relations: { schoolPage: true },
      where: { studentId },
      skip,
      take,
    });
  }

  async findOneByStudentAndSchoolPage(studentId: number, schoolPageId: number) {
    return this.findOne({
      where: { studentId, schoolPageId },
    });
  }

  async insertAndIncreaseCount(studentId: number, schoolPageId: number) {
    return this.transaction(async (em) => {
      await em.getRepository(SubscriptionEntity).insert(this.create({ studentId, schoolPageId, status: true }));
      await em
        .getRepository(SchoolPageCountEntity)
        .createQueryBuilder()
        .update()
        .set({ subscribers: () => 'subscribers + 1' })
        .where({ schoolPage: { id: schoolPageId } })
        .execute();
    });
  }

  async updateAndDecreaseCount(studentId: number, schoolPageId: number) {
    return this.transaction(async (em) => {
      await em.getRepository(SubscriptionEntity).update({ studentId, schoolPageId }, { status: false, unsubscribedAt: new Date() });
      await em
        .getRepository(SchoolPageCountEntity)
        .createQueryBuilder('count')
        .update()
        .set({ subscribers: () => 'IF(subscribers = 0, 0, subscribers + 1)' })
        .where({ schoolPage: { id: schoolPageId } })
        .execute();
    });
  }

  async deleteOne(studentId: number, schoolPageId: number) {
    return this.delete({ studentId, schoolPageId });
  }
}
