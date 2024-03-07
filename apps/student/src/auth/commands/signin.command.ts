import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class SignInCommand {
  @ApiProperty({ type: String, format: 'email', example: 'student@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @Length(8, 50)
  password: string;
}
