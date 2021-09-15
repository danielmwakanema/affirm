import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { AffirmationsService } from './affirmations.service';
import { CreateAffirmationDto, UpdateAffirmationDto } from './dto';
import { AffirmationDto } from './dto/affirmation.dto';
import { FindAffirmationByIdPipe, SanitizeAffirmationPipe } from './pipes';
import { AffirmationDocument } from './schemas/affirmation.schema';
import { LogInterceptor } from '../log/interceptors/log.interceptor';

@UseInterceptors(LogInterceptor)
@Controller('affirmations')
export class AffirmationsController {
  constructor(private readonly affirmationsService: AffirmationsService) {}

  @ApiNotFoundResponse()
  @ApiOkResponse({ type: AffirmationDto })
  @ApiInternalServerErrorResponse()
  @UseInterceptors(CacheInterceptor)
  @Get(':id')
  findOne(
    @Param('id', FindAffirmationByIdPipe) affirmation: AffirmationDocument,
  ): AffirmationDocument {
    return affirmation;
  }

  @ApiCreatedResponse({ type: AffirmationDto })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Post()
  async create(
    @Body(SanitizeAffirmationPipe) data: CreateAffirmationDto,
  ): Promise<AffirmationDocument> {
    return this.affirmationsService.create(data);
  }

  @ApiNotFoundResponse()
  @ApiOkResponse({ type: AffirmationDto })
  @ApiBadRequestResponse()
  @ApiInternalServerErrorResponse()
  @Patch(':id')
  async update(
    @Param('id', FindAffirmationByIdPipe) affirmation: AffirmationDocument,
    @Body(SanitizeAffirmationPipe) data: UpdateAffirmationDto,
  ): Promise<AffirmationDocument> {
    return this.affirmationsService.update(affirmation.id, data);
  }

  @ApiNotFoundResponse()
  @ApiInternalServerErrorResponse()
  @Delete(':id')
  async delete(
    @Param('id', FindAffirmationByIdPipe) affirmation: AffirmationDocument,
  ): Promise<void> {
    return this.affirmationsService.delete(affirmation.id);
  }
}
