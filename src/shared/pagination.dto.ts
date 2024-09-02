import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PaginationDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  limit: number = 10;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  offset: number = 0;
}
