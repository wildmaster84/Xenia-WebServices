import IpAddress from 'src/domain/value-objects/IpAddress';
import SessionFlags from 'src/domain/value-objects/SessionFlags';
import SessionId from 'src/domain/value-objects/SessionId';
import TitleId from 'src/domain/value-objects/TitleId';
import Xuid from 'src/domain/value-objects/Xuid';

export class CreateSessionCommand {
  constructor(
    public readonly title: TitleId,
    public readonly sessionId: SessionId,
    public readonly hostAddress: IpAddress,
    public readonly flags: SessionFlags,
    public readonly publicSlotsCount: number,
    public readonly privateSlotsCount: number,
    public readonly userIndex: number,
  ) {}
}
