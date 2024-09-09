import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class ConfigDto {
  @IsNumber()
  @Type(() => Number)
  port: number;

  @IsString()
  token: string;
}
