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
    IsNumber,
  } from 'class-validator';
  import { IsObjectId } from 'class-validator-mongo-object-id';
  import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongoose';
import { orderType } from './order.enum';

  export class OrderDto {
    @ApiProperty({
      nullable: false,
    })
    @IsString()
    id?: string;
  
    @ApiProperty({
      nullable: false,
    })
    @IsString()
    title?: string;

    @ApiProperty({
        nullable: false,
    })
    @IsString()
      desc?: string;

    @ApiProperty({
        nullable: false,
    })
    @IsDate()
      createdDate?: Date;

    @ApiProperty({
        nullable: false,
    })
    @IsNumber()
    price?: number;

    @ApiProperty({
        nullable: false,
    })
    @IsObjectId()
    userId?: ObjectId;

    @ApiProperty({
        nullable: false,
    })
    @IsObjectId()
    vehicleId?: ObjectId;

    @ApiProperty({
      nullable: false,
      enum: orderType,
      example: 1,
    })
    @IsEnum(orderType)
    @IsNotEmpty()
    status: orderType;
    orderType?: number;
  }