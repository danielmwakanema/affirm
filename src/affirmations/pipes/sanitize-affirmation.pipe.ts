import { PipeTransform } from '@nestjs/common';
import { StringSanitizer } from 'src/common/io/sanitizers';
import { CreateAffirmationDto } from '../dto';

type Affirmation = Partial<CreateAffirmationDto>;

export class SanitizeAffirmationPipe
  implements PipeTransform<Affirmation, Affirmation>
{
  transform(value: Affirmation): Affirmation {
    const { body } = value;
    return {
      body: this.sanitizeBody(body),
    };
  }

  private sanitizeBody(body: string): string {
    return StringSanitizer.escape(StringSanitizer.trim(body));
  }
}
