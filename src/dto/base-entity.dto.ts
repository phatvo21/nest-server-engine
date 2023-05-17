import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class BaseEntityDto {
  @ApiProperty({ example: '23e4567-e89b-12d3-a456-426614174000' })
  @ApiProperty({ readOnly: true })
  @IsOptional()
  id: string;

  @ApiProperty({ readOnly: true })
  @IsOptional()
  createdAt: Date;

  @ApiProperty({ readOnly: true })
  @IsOptional()
  updatedAt: Date;
}
