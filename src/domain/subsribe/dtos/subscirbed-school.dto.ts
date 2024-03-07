import { SchoolEntity } from '@common/entities';
import { ApiResponseProperty } from '@nestjs/swagger';

export class SubscribedSchoolDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  location: string;

  @ApiResponseProperty({ type: BigInt })
  subscribers: bigint;

  constructor(school: SchoolEntity) {
    this.id = school.id;
    this.name = school.name;
    this.location = school.location;
    this.subscribers = school.schoolStorage.subscribers;
  }
}
