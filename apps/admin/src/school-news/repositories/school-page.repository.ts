import { SchoolPageEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';

@InjectableRepository(SchoolPageEntity)
export class SchoolPageRepository extends AbstractRepository<SchoolPageEntity> {
  async findOneByAdminId(adminId: number) {
    return this.findOne({ where: { admin: { id: adminId } } });
  }
}
