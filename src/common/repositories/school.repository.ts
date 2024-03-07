import { AdminEntity, SchoolEntity } from '@common/entities';
import { AbstractRepository, InjectableRepository } from '@core/typeorm';

@InjectableRepository(SchoolEntity)
export class SchoolRepository extends AbstractRepository<SchoolEntity> {
  async existsById(id: number) {
    return this.existsBy({ id });
  }

  async existsByNameAndLocation(name: string, location: string) {
    return this.existsBy({ name, location });
  }

  async findById(id: number) {
    return this.findOneBy({ id });
  }

  async createSchool(admin: AdminEntity, properties: Pick<SchoolEntity, 'name' | 'location'>) {
    return this.transaction(async (em) => {
      const schoolRepository = em.getRepository(SchoolEntity);
      const school = schoolRepository.create({ ...properties, admins: [admin] });
      await schoolRepository.insert(school);

      const adminRepository = em.getRepository(AdminEntity);
      await adminRepository.update(admin.id, { school });

      return school;
    });
  }
}
