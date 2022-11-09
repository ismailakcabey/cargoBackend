import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsOptional,
    IsObject,
    IsBoolean,
    IsInt,
    IsDate,
    IsNumber,
    isString,
} from 'class-validator';
import { IsObjectId } from 'class-validator-mongo-object-id';
import { ExpensesType } from './userExpenses.enum';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export class UserExpensesDto{
    @ApiProperty({
        nullable: false,
        enum: ExpensesType,
        example: 1,
      })
      @IsEnum(ExpensesType)
      @IsNotEmpty()
      status: ExpensesType;
      ExpensesType?: number;

      @ApiProperty({
        nullable: false,
        })
        @IsDate()
        createdDate?: Date;

        @ApiProperty({
        nullable: false,
        })
        @IsNumber()
        amount?: number;

        @ApiProperty({
            nullable: false,
        })
        @IsObjectId()
        userId?: ObjectId;
    
}