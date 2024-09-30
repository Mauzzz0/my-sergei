import { IsString } from 'class-validator';

export type User = {
  id: number;
  nick: string;
  password: string;
};

export class LoginDto {
  @IsString()
  nick: string;

  @IsString()
  password: string;
}
