import { AdminEntity } from '@common/entities';
import { ApiResponseProperty } from '@nestjs/swagger';

export class SchoolNewsAdminDto {
  @ApiResponseProperty({ type: Number })
  id: number;

  @ApiResponseProperty({ type: String })
  name: string;

  constructor(admin: AdminEntity) {
    this.id = admin.id;
    this.name = admin.name;
  }
}
