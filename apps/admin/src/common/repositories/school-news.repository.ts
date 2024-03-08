import { SchoolNewsEntity, SchoolPageEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';
import { DeepPartial } from 'typeorm';

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

  async insertOne(schoolPage: SchoolPageEntity, properties: DeepPartial<SchoolNewsEntity>) {
    const schoolNews = this.create({ ...properties, schoolPage });
    await this.insert(schoolNews);

    return schoolNews;
  }

  async updateOne(schoolNews: SchoolNewsEntity, properties: DeepPartial<SchoolNewsEntity>) {
    await this.update(schoolNews.id, properties);

    return this.create({ ...schoolNews, ...properties });
  }
}
