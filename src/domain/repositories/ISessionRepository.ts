import Session from '../aggregates/Session';
import SessionId from '../value-objects/SessionId';
import TitleId from '../value-objects/TitleId';
import Xuid from '../value-objects/Xuid';

export default interface ISessionRepository {
  findAdvertisedSessions: (titleId: TitleId, resultsCount: number) => Promise<Session[]>;
  findSession: (titleId: TitleId, id: SessionId) => Promise<Session | undefined>;
  findByPlayer: (xuid: Xuid) => Promise<Session>;
  save: (session: Session) => Promise<void>;
}

export const ISessionRepositorySymbol = Symbol('ISessionRepository');
