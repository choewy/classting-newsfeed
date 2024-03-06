import { AccountType } from '@common/constants';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, Length } from 'class-validator';

export class SignupCommand {
  @ApiProperty({ type: String, enum: AccountType })
  @IsEnum(AccountType)
  type: AccountType;

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
