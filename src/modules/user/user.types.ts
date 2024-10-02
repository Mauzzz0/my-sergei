import { IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  nick: string;

  @IsString()
  password: string;
}
