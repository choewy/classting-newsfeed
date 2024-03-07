import { Type } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export const ListResponseType = <T>(Row: Type<T>) => {
  abstract class ListResponseDto {
    @ApiResponseProperty({ type: Number })
    total: number;

    @ApiResponseProperty({ type: [Row] })
    rows: T[];

    constructor(rows: T[], total: number) {
      this.rows = rows;
      this.total = total;
    }
  }

  return ListResponseDto;
};
