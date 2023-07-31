import SessionId from 'src/domain/value-objects/SessionId';
import TitleId from 'src/domain/value-objects/TitleId';
import IpAddress from 'src/domain/value-objects/IpAddress';

export class DeleteSessionCommand {
  constructor(
    public readonly title: TitleId,
    public readonly sessionId: SessionId,
    public readonly hostAddress?: IpAddress,
  ) {}
}
