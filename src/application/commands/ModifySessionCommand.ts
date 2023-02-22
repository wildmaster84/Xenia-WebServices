import SessionFlags from 'src/domain/value-objects/SessionFlags';
import SessionId from 'src/domain/value-objects/SessionId';
import TitleId from 'src/domain/value-objects/TitleId';

export class ModifySessionCommand {
  constructor(
    public readonly titleId: TitleId,
    public readonly sessionId: SessionId,
    public readonly flags: SessionFlags,
    public readonly publicSlotsCount: number,
    public readonly privateSlotsCount: number,
  ) {}
}
