import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateWriteOpResult } from 'mongoose';
import { CreateAffirmationDto, UpdateAffirmationDto } from './dto';
import { AffirmationDocument, Affirmation } from './schemas/affirmation.schema';

@Injectable()
export class AffirmationsService {
  constructor(
    @InjectModel(Affirmation.name)
    private readonly affirmationsModel: Model<AffirmationDocument>,
  ) {}

  findOne(id: string): Promise<AffirmationDocument> {
    return this.affirmationsModel.findById(id).exec();
  }

  create(data: CreateAffirmationDto): Promise<AffirmationDocument> {
    const entity = new this.affirmationsModel(data);
    return entity.save();
  }

  update(id: string, data: UpdateAffirmationDto): Promise<UpdateWriteOpResult> {
    return this.affirmationsModel.updateOne({ id }, data, { new: true }).exec();
  }

  random(): Promise<AffirmationDocument> {
    return this.affirmationsModel.findOne().exec();
  }

  async delete(id: string): Promise<void> {
    await this.affirmationsModel.findByIdAndDelete(id).exec();
  }
}
