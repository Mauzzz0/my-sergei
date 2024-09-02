import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsPositive } from 'class-validator';

export class GenerateCommandOptions {
  @IsNumber()
  @IsPositive()
  @IsInt()
  @Type(() => Number)
  count: number;
}
