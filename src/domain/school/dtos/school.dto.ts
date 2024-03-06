import { SchoolEntity } from '@common/entities';
import { ApiResponseProperty } from '@nestjs/swagger';

export class SchoolDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  location: string;

  constructor(school: SchoolEntity) {
    this.id = school.id;
    this.name = school.name;
    this.location = school.location;
  }
}
