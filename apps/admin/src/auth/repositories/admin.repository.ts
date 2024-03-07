import { AdminEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';

@InjectableRepository(AdminEntity)
export class AdminRepository extends AbstractRepository<AdminEntity> {
  async findOneByEmail(email: string) {
    return this.findOneBy({ email });
  }

  async existsByEmail(email: string) {
    return this.existsBy({ email });
  }
}
