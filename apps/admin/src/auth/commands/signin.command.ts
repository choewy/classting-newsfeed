import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class SignInCommand {
  @ApiProperty({ type: String, format: 'email', example: 'admin@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: 'password' })
  @Length(8, 50)
  password: string;
}
