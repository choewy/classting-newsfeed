import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class SignUpCommand {
  @ApiProperty({ type: String, format: 'email', example: 'admin@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String, example: '관리자' })
  @Length(2, 20)
  name: string;

  @ApiProperty({ type: String })
  @Length(8, 50)
  password: string;

  @ApiProperty({ type: String })
  @Length(8, 50)
  confirmPassword: string;
}
