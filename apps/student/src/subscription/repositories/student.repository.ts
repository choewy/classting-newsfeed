import { StudentEntity } from '@libs/entity';
import { AbstractRepository, InjectableRepository } from '@libs/typeorm';

@InjectableRepository(StudentEntity)
export class StudentRepository extends AbstractRepository<StudentEntity> {}
