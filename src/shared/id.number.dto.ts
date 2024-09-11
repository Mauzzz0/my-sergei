import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class IdNumberDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  id: number;
}
