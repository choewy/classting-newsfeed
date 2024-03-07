import { SchoolNewsEntity, SchoolStorageEntity, SubscribeEntity } from '@common/entities';
import { AbstractRepository, InjectableRepository } from '@core/typeorm';
import { MoreThan } from 'typeorm';

@InjectableRepository(SubscribeEntity)
export class SubscribeRepository extends AbstractRepository<SubscribeEntity> {
  findActiveManyAndCountByStudent(studentId: number, cursor: number, take: number) {
    return this.findAndCount({
      relations: { school: true },
      where: {
        student: { id: studentId },
        school: { id: MoreThan(cursor) },
        status: true,
      },
      take,
    });
  }

  upsertBySubscribe(studentId: number, schoolId: number) {
    return this.transaction(async (em) => {
      const subscribeRepository = em.getRepository(SubscribeEntity);
      const subscription = await subscribeRepository.findOneBy({
        studentId,
        schoolId,
      });

      if (subscription?.status === true) {
        return;
      }

      await subscribeRepository.upsert(
        {
          studentId,
          schoolId,
          status: true,
        },
        { conflictPaths: { studentId: true, schoolId: true } },
      );

      await em
        .getRepository(SchoolStorageEntity)
        .createQueryBuilder()
        .update()
        .set({ subscribers: () => 'subscribers + 1' })
        .where({ school: { id: schoolId } })
        .execute();
    });
  }

  upsertByUnsubscribe(studentId: number, schoolId: number) {
    return this.transaction(async (em) => {
      const subscribeRepository = em.getRepository(SubscribeEntity);
      const subscription = await subscribeRepository.findOneBy({
        studentId,
        schoolId,
      });

      if (subscription?.status === false) {
        return;
      }

      const lastSchoolNews = await em.getRepository(SchoolNewsEntity).findOne({
        where: { school: { id: schoolId } },
        order: { id: 'DESC' },
      });

      await subscribeRepository.upsert(
        { studentId, schoolId, status: false, lastSchoolNews },
        { conflictPaths: { studentId: true, schoolId: true } },
      );

      await em
        .getRepository(SchoolStorageEntity)
        .createQueryBuilder()
        .update()
        .set({ subscribers: () => 'IF(subscribers = 0, 0, subscribers - 1)' })
        .where({ school: { id: schoolId } })
        .execute();
    });
  }
}
