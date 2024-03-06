import { AdminEntity } from '@common/entities';
import { AbstractRepository, InjectableRepository } from '@core/typeorm';

@InjectableRepository(AdminEntity)
export class AdminRepository extends AbstractRepository<AdminEntity> {
  async findByIdWithSchool(id: number) {
    return this.findOne({
      relations: { school: true },
      where: { id },
    });
  }
}
