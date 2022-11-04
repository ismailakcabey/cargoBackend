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
    @IsString()
      id?: string;
  }