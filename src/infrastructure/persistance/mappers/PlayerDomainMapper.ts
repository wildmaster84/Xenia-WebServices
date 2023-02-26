import { Player as PlayerModel } from '../models/PlayerSchema';
import Player from '../../../domain/aggregates/Player';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { Inject, Injectable } from '@nestjs/common';
import IpAddress from 'src/domain/value-objects/IpAddress';
import Xuid from 'src/domain/value-objects/Xuid';
import MacAddress from 'src/domain/value-objects/MacAddress';
import SessionId from 'src/domain/value-objects/SessionId';

@Injectable()
export default class PlayerDomainMapper {
  constructor(@Inject(ILoggerSymbol) private readonly logger: ILogger) {}

  public mapToDomainModel(player: PlayerModel): Player {
    return new Player({
      xuid: new Xuid(player.xuid),
      hostAddress: new IpAddress(player.hostAddress),
      macAddress: new MacAddress(player.macAddress),
      machineId: new Xuid(player.machineId),
      port: player.port,
      sessionId: player.sessionId ? new SessionId(player.sessionId) : undefined,
    });
  }
}
