import { Session as SessionModel } from '../models/SessionSchema';
import Session from '../../../domain/aggregates/Session';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { Inject, Injectable } from '@nestjs/common';
import TitleId from 'src/domain/value-objects/TitleId';
import IpAddress from 'src/domain/value-objects/IpAddress';
import SessionFlags from 'src/domain/value-objects/SessionFlags';
import Xuid from 'src/domain/value-objects/Xuid';
import MacAddress from 'src/domain/value-objects/MacAddress';

@Injectable()
export default class SessionDomainMapper {
  constructor(@Inject(ILoggerSymbol) private readonly logger: ILogger) {}

  public mapToDomainModel(session: SessionModel): Session {
    return new Session({
      id: new Xuid(session.id),
      titleId: new TitleId(session.titleId),
      flags: new SessionFlags(session.flags),
      hostAddress: new IpAddress(session.hostAddress),
      macAddress: new MacAddress(session.macAddress),
      publicSlotsCount: session.publicSlotsCount,
      privateSlotsCount: session.privateSlotsCount,
      userIndex: session.userIndex,
      port: session.port,
      players: session.players.map((xuid) => new Xuid(xuid)),
    });
  }
}
