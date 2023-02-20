import TitleServer from '../aggregates/TitleServer';
import TitleId from '../value-objects/TitleId';

export default interface ITitleServerRepository {
  findTitleServers: (titleId: TitleId) => Promise<TitleServer[]>;
}

export const ITitleServerRepositorySymbol = Symbol('ITitleServerRepository');
