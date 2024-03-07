import { AdminEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';

@InjectableRepository(AdminEntity)
export class AdminRepository extends AbstractRepository<AdminEntity> {
  async findOneByEmail(email: string) {
    return this.findOne({
      relations: { schoolPage: true },
      where: { email },
    });
  }

  async existsByEmail(email: string) {
    return this.existsBy({ email });
  }
}
