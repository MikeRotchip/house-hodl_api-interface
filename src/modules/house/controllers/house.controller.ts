import {
  Body,
  Controller,
  OnModuleInit,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Client, ClientKafka } from '@nestjs/microservices';
import { KafkaConfig } from '../../../configs/kafka-config';
import { SecurityService } from '../../authentication/services';
import { Security } from '../../authentication/decorators';
import { HouseDto, InvitationCreateDto, InvitationUseDto } from '../dto';
import { KafkaMetadataUtil } from '../../authentication/util';
import { JwtAuthGuard } from '../../authentication/guards';
import { KafkaTopic } from '../enums';

@Controller('house')
@UseGuards(JwtAuthGuard)
export class HouseController {
  constructor(private kafkaMetadata: KafkaMetadataUtil) {}

  @Client(KafkaConfig)
  private client: ClientKafka;

  @Post('/')
  async createHouse(
    @Security() security: SecurityService,
    @Body() houseDto: HouseDto,
  ) {
    await this.client.emit('HouseCreationRequested', {
      headers: this.kafkaMetadata.getUserAuthMetadata(security),
      value: houseDto,
    });
  }

  @Post('/invitation')
  async createInvitation(
    @Security() security: SecurityService,
    @Body() invitationDto: InvitationCreateDto,
  ) {
    await this.client.emit(KafkaTopic.INVITATION_CREATION_REQUEST, {
      headers: this.kafkaMetadata.getUserAuthMetadata(security),
      value: invitationDto,
    });
  }

  @Post('/invitation/use')
  async useInvitation(
    @Security() security: SecurityService,
    @Body() invitationDto: InvitationUseDto,
  ) {
    await this.client.emit(KafkaTopic.INVITATION_USE_REQUEST, {
      headers: this.kafkaMetadata.getUserAuthMetadata(security),
      value: invitationDto,
    });
  }
}
