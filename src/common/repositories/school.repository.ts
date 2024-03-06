import { SchoolEntity } from '@common/entities';
import { AbstractRepository, InjectableRepository } from '@core/typeorm';

@InjectableRepository(SchoolEntity)
export class SchoolRepository extends AbstractRepository<SchoolEntity> {}
