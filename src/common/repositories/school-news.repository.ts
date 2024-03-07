import { AdminEntity, SchoolNewsEntity } from '@common/entities';
import { AbstractRepository, InjectableRepository } from '@core/typeorm';
import { DeepPartial } from 'typeorm';

@InjectableRepository(SchoolNewsEntity)
export class SchoolNewsRepository extends AbstractRepository<SchoolNewsEntity> {
  async hasById(id: bigint) {
    return this.existsBy({ id });
  }

  async findByIdSchoolAndAdmins(id: bigint) {
    return this.findOne({
      relations: { school: true, writer: true, updater: true },
      where: { id },
    });
  }

  async createSchoolNews(writer: AdminEntity, properties: DeepPartial<SchoolNewsEntity>) {
    const schoolNews = this.create({ writer, school: writer.school, ...properties });
    await this.insert(schoolNews);

    return schoolNews;
  }

  async updateSchoolNews(updater: AdminEntity, schoolNews: SchoolNewsEntity, properties: DeepPartial<SchoolNewsEntity>) {
    schoolNews.updater = updater;
    schoolNews.title = properties.title;
    schoolNews.contents = properties.contents;

    await this.update(String(schoolNews.id), schoolNews);

    return schoolNews;
  }

  async deleteById(id: bigint) {
    return this.delete(String(id));
  }
}
