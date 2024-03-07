import { SchoolPageEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';

@InjectableRepository(SchoolPageEntity)
export class SchoolPageRepository extends AbstractRepository<SchoolPageEntity> {
  async existsById(id: number) {
    return this.existsBy({ id });
  }
}
