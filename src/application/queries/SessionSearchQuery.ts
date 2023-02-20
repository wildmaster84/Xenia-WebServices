import TitleId from 'src/domain/value-objects/TitleId';

export class SessionSearchQuery {
  constructor(
    public readonly title: TitleId,
  ) {}
}
