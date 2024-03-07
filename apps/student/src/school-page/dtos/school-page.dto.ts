import { SchoolPageEntity } from '@libs/entity';
import { ApiResponseProperty } from '@nestjs/swagger';
import { isNotEmpty } from 'class-validator';

export class SchoolPageDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  @ApiResponseProperty({ type: String })
  location: string;

  @ApiResponseProperty({ type: Number })
  subscribers: number;

  @ApiResponseProperty({ type: Boolean })
  subscription: boolean;

  constructor(schoolPage: SchoolPageEntity) {
    this.id = schoolPage.id;
    this.name = schoolPage.name;
    this.location = schoolPage.location;
    this.subscribers = schoolPage.schoolPageCount?.subscribers ?? 0;
    this.subscription = isNotEmpty(schoolPage.subscription);
  }
}
