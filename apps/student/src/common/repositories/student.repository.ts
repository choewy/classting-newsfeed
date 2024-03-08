import { StudentEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';
import { DeepPartial } from 'typeorm';

@InjectableRepository(StudentEntity)
export class StudentRepository extends AbstractRepository<StudentEntity> {
  async findOneByEmail(email: string) {
    return this.findOneBy({ email });
  }

  async existsByEmail(email: string) {
    return this.existsBy({ email });
  }

  async insertOne(properties: DeepPartial<StudentEntity>) {
    const student = this.create(properties);
    await this.insert(student);

    return student;
  }
}
