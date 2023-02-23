import Session from '../../../domain/aggregates/Session';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { Inject, Injectable } from '@nestjs/common';
import { SessionDto } from '../../persistance/dtos/SessionDto';

@Injectable()
export default class SessionPresentationMapper {
  constructor(@Inject(ILoggerSymbol) private readonly logger: ILogger) {}

  public mapToPresentationModel(session: Session): SessionDto {
    return {
      id: session.id.value,
      flags: session.flags.value,
      hostAddress: session.hostAddress.value,
      macAddress: session.macAddress.value,
      publicSlotsCount: session.publicSlotsCount,
      privateSlotsCount: session.privateSlotsCount,
      openPublicSlotsCount: session.openPublicSlots,
      openPrivateSlotsCount: session.openPrivateSlots,
      filledPublicSlotsCount: session.filledPublicSlots,
      filledPrivateSlotsCount: session.filledPrivateSlots,
      port: session.port,
    };
  }
}
