import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class BaseEntityDto {
  @ApiProperty({ example: 'Aolg5sBh2jQdrhS2i' })
  @ApiProperty({ readOnly: true })
  @IsOptional()
  _id: string;

  @ApiProperty({ readOnly: true })
  @IsOptional()
  createdAt: Date;

  @ApiProperty({ readOnly: true })
  @IsOptional()
  updatedAt: Date;
}
