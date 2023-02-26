import SessionId from 'src/domain/value-objects/SessionId';
import Xuid from 'src/domain/value-objects/Xuid';

export class SetPlayerSessionIdCommand {
  constructor(
    public readonly xuid: Xuid,
    public readonly sessionId: SessionId,
  ) {}
}
