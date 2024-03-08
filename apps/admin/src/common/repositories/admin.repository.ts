import { AdminEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';
import { DeepPartial } from 'typeorm';

@InjectableRepository(AdminEntity)
export class AdminRepository extends AbstractRepository<AdminEntity> {
  async findOneByEmail(email: string) {
    return this.findOneBy({ email });
  }

  async existsByEmail(email: string) {
    return this.existsBy({ email });
  }

  async insertOne(properties: DeepPartial<AdminEntity>) {
    const admin = this.create(properties);
    await this.insert(admin);

    return admin;
  }
}
