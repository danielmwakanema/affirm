import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAffirmationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  body: string;
}
