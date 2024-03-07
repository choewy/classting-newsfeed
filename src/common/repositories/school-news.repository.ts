import { AdminEntity, SchoolNewsEntity } from '@common/entities';
import { AbstractRepository, InjectableRepository } from '@core/typeorm';
import { DeepPartial } from 'typeorm';

@InjectableRepository(SchoolNewsEntity)
export class SchoolNewsRepository extends AbstractRepository<SchoolNewsEntity> {
  async hasById(id: bigint) {
    return this.existsBy({ id });
  }

  async createSchoolNews(writer: AdminEntity, properties: DeepPartial<SchoolNewsEntity>) {
    const schoolNews = this.create({ writer, school: writer.school, ...properties });
    await this.insert(schoolNews);

    return schoolNews;
  }
}
