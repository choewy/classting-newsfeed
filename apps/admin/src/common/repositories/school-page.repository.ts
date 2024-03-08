import { SchoolPageEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';
import { DeepPartial } from 'typeorm';

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

  async createOne(adminId: number, properies: DeepPartial<SchoolPageEntity>) {
    const schoolPage = this.create({ ...properies, admin: { id: adminId }, schoolPageCount: {} });
    await schoolPage.save();

    return schoolPage;
  }
}
