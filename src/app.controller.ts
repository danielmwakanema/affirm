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
import { AffirmationsService } from './affirmations/affirmations.service';
import { CreateAffirmationDto, UpdateAffirmationDto } from './affirmations/dto';
import { AffirmationDto } from './affirmations/dto/affirmation.dto';
import { FindAffirmationByIdPipe } from './affirmations/pipes/find-affirmation-by-id.pipe';
import { AffirmationDocument } from './affirmations/schemas/affirmation.schema';
import { LogInterceptor } from './log/interceptors/log.interceptor';

@UseInterceptors(LogInterceptor)
@Controller()
export class AppController {
  constructor(private readonly affirmationsService: AffirmationsService) {}

  @ApiOkResponse({ type: AffirmationDto })
  @ApiInternalServerErrorResponse()
  @Get()
  async random(): Promise<AffirmationDocument> {
    return this.affirmationsService.random();
  }

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
    @Body() data: CreateAffirmationDto,
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
    @Body() data: UpdateAffirmationDto,
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
