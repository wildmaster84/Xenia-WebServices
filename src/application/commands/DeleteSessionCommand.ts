import SessionId from 'src/domain/value-objects/SessionId';
import TitleId from 'src/domain/value-objects/TitleId';

export class DeleteSessionCommand {
  constructor(
    public readonly title: TitleId,
    public readonly sessionId: SessionId,
  ) {}
}
