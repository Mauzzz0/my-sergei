import { Type } from 'class-transformer';
import { IsNumber } from 'class-validator';

export class ConfigDto {
  @IsNumber()
  @Type(() => Number)
  PORT: number;
}
