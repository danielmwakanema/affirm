import { ApiProperty } from '@nestjs/swagger';

export class AffirmationDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  __v: number;
}
