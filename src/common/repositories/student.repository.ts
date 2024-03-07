import { StudentEntity } from '@common/entities';
import { AbstractRepository, InjectableRepository } from '@core/typeorm';

@InjectableRepository(StudentEntity)
export class StudentRepository extends AbstractRepository<StudentEntity> {
  existsById(id: number) {
    return this.existsBy({ id });
  }
}
