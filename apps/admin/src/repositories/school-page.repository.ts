import { SchoolPageEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';

@InjectableRepository(SchoolPageEntity)
export class SchoolPageRepository extends AbstractRepository<SchoolPageEntity> {
  async existsByAdminId(adminId: number) {
    return this.existsBy({ admin: { id: adminId } });
  }

  async findOneByAdminId(adminId: number) {
    return this.findOne({ where: { admin: { id: adminId } } });
  }

  async findOneById(id: number) {
    return this.findOne({ relations: { admin: true }, where: { id } });
  }

  async deleteByAdminId(adminId: number) {
    return this.delete({ admin: { id: adminId } });
  }
}
