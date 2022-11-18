import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsOptional,
    IsObject,
    IsBoolean,
    IsInt,
    IsDate,
    isString,
  } from 'class-validator';
  import { userType } from './user.enum';
  import { ApiProperty } from '@nestjs/swagger';

  export class UserDto {
    @ApiProperty({
      nullable: false,
    })
    @IsString()
    name?: string;
  
    @ApiProperty({
      nullable: false,
    })
    @IsString()
    email?: string;

    @ApiProperty({
        nullable: false,
    })
    @IsString()
      password?: string;

    @ApiProperty({
        nullable: false,
    })
    @IsDate()
      createdDate?: Date;

      @ApiProperty({
        nullable: false,
    })
    @IsDate()
      verify?: Boolean;

    @ApiProperty({
        nullable: false,
    })
    @IsString()
      id?: string;

      @ApiProperty({
        nullable: false,
        enum: userType,
        example: 1,
      })
      @IsEnum(userType)
      @IsNotEmpty()
      status: userType;
      userType?: number;
  }