import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, Length } from 'class-validator';

export enum SignupType {
  Admin = 'admin',
  Student = 'student',
}

export class SignupCommand {
  @ApiProperty({ type: String, enum: SignupType })
  @IsEnum(SignupType)
  type: SignupType;

  @ApiProperty({ type: String, format: 'email' })
  @IsEmail()
  email: string;

  @ApiProperty({ type: String })
  @Length(1, 10)
  name: string;

  @ApiProperty({ type: String })
  @Length(8, 50)
  password: string;

  @ApiProperty({ type: String })
  @Length(8, 50)
  confirmPassword: string;
}
