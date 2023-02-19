import TitleServer from '../aggregates/TitleServer';
import TitleId from '../value-objects/TitleId';

export default interface ITitleServerRepository {
  findTitleServers: (TitleId: TitleId) => Promise<TitleServer[]>;
}

export const ITitleServerRepositorySymbol = Symbol('ITitleServerRepository');
