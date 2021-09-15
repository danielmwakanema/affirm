import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAffirmationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  body: string;
}
