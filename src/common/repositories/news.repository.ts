import { NewsEntity } from '@common/entities';
import { AbstractRepository, InjectableRepository } from '@core/typeorm';
import { DeepPartial } from 'typeorm';

@InjectableRepository(NewsEntity)
export class NewsRepository extends AbstractRepository<NewsEntity> {
  async findOneById(id: number) {
    return this.findOne({
      relations: { school: true },
      where: { id },
    });
  }

  async findManyAndCount(schoolId: number, skip: number, take: number) {
    return this.findAndCount({
      where: { school: { id: schoolId } },
      order: { id: 'DESC' },
      skip,
      take,
    });
  }

  async insertOne(adminId: number, schoolId: number, title: string, contents: string) {
    const news = this.create({
      title,
      contents,
      school: { id: schoolId },
      writer: { id: adminId },
    });

    await this.insert(news);

    return news;
  }

  async updateOne(news: NewsEntity, adminId: number, title: string, contents: string) {
    news = Object.assign<NewsEntity, DeepPartial<NewsEntity>>(news, {
      title,
      contents,
      updater: { id: adminId },
    });

    await this.update(news.id, news);

    return news;
  }

  async deleteOne(news: NewsEntity) {
    await this.delete(news.id);
  }
}
