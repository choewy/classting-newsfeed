import { ApiResponseProperty } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

export class SchoolNewsDeleteResultDto {
  @ApiResponseProperty({ type: BigInt })
  id: bigint;

  @ApiResponseProperty({ type: Number })
  affected: number;

  constructor(id: bigint, deleteResult: DeleteResult) {
    this.id = id;
    this.affected = deleteResult.affected;
  }
}
