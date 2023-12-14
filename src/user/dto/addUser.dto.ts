import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString } from 'class-validator';

export class AddUserDto {
  @IsString()
  @ApiProperty()
  fullName: string;

  @IsEmail()
  @ApiProperty()
  emailId: string;

  @IsString()
  @ApiProperty()
  password: string;

  @IsNumber()
  @ApiProperty()
  mobileNo: number;
}
