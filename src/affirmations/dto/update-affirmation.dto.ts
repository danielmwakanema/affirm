import { PartialType } from '@nestjs/swagger';
import { CreateAffirmationDto } from './';

export class UpdateAffirmationDto extends PartialType(CreateAffirmationDto) {}
