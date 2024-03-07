import { NotFoundSchoolException, NotFoundStudentException } from '@common/implements';
import { SchoolRepository, StudentRepository, SubscribeRepository } from '@common/repositories';
import { Injectable } from '@nestjs/common';

import { SubscribedSchoolDto, SubscribedSchoolListDto } from './dtos';
import { GetMySubscribedSchoolsQuery } from './queries';

@Injectable()
export class SubscribeService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly schoolRepository: SchoolRepository,
    private readonly subscribeRepository: SubscribeRepository,
  ) {}

  async getMySubscribedSchools(studentId: number, query: GetMySubscribedSchoolsQuery) {
    const [subsribes, total] = await this.subscribeRepository.findActiveManyAndCountByStudent(studentId, query.cursor, query.take);

    return new SubscribedSchoolListDto(
      subsribes.map(({ school }) => new SubscribedSchoolDto(school)),
      total,
    );
  }

  async subscribeSchool(studentId: number, schoolId: number) {
    if ((await this.studentRepository.existsById(studentId)) === null) {
      throw new NotFoundStudentException();
    }

    if ((await this.schoolRepository.existsById(schoolId)) === null) {
      throw new NotFoundSchoolException();
    }

    await this.subscribeRepository.upsertBySubscribe(studentId, schoolId);
  }

  async unsubscribeSchool(studentId: number, schoolId: number) {
    if ((await this.studentRepository.existsById(studentId)) === null) {
      throw new NotFoundStudentException();
    }

    if ((await this.schoolRepository.existsById(schoolId)) === null) {
      throw new NotFoundSchoolException();
    }

    await this.subscribeRepository.upsertByUnsubscribe(studentId, schoolId);
  }
}
