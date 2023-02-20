import SessionId from 'src/domain/value-objects/SessionId';
import TitleId from 'src/domain/value-objects/TitleId';

export class GetSessionQuery {
  constructor(
    public readonly title: TitleId,
    public readonly session: SessionId,
  ) {}
}
