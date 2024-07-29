import TitleId from 'src/domain/value-objects/TitleId';

export class SessionSearchQuery {
  constructor(
    public readonly title: TitleId,
    public readonly searchIndex: number,
    public readonly resultsCount: number,
    public readonly numUsers: number,
  ) {}
}
