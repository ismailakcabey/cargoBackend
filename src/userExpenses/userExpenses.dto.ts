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

import { ExpensesType } from './userExpenses.enum';
import { ApiProperty } from '@nestjs/swagger';

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
}