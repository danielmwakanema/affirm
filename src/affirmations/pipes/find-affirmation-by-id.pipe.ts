import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { AffirmationsService } from '../affirmations.service';
import { AffirmationDocument } from '../schemas/affirmation.schema';

@Injectable()
export class FindAffirmationByIdPipe
  implements PipeTransform<string, Promise<AffirmationDocument>>
{
  constructor(private readonly affirmationsService: AffirmationsService) {}

  async transform(value: string): Promise<AffirmationDocument> {
    const affirmation = await this.affirmationsService.findOne(value);
    if (!affirmation) throw new NotFoundException('Affirmation was not found.');
    return affirmation;
  }
}
