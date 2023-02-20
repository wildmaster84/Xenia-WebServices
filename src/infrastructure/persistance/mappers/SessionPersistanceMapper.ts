import { Injectable } from '@nestjs/common';
import Session from '../../../domain/aggregates/Session';
import { Session as SessionModel } from '../models/SessionSchema';

@Injectable()
export default class SessionPersistanceMapper {
  public mapToDataModel(session: Session): SessionModel {
    return {
      id: session.id.value,
      titleId: session.titleId.toString(),
      hostAddress: session.hostAddress.value,
      flags: session.flags.value,
      publicSlotsCount: session.publicSlotsCount,
      privateSlotsCount: session.privateSlotsCount,
      userIndex: session.userIndex,
      advertised: session.flags.advertised,
      macAddress: session.macAddress.value,
    };
  }
}
