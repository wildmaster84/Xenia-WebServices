import Session from '../aggregates/Session';
import SessionId from '../value-objects/SessionId';
import TitleId from '../value-objects/TitleId';

export default interface ISessionRepository {
  findAdvertisedSessions: (titleId: TitleId) => Promise<Session[]>;
  findSession: (titleId: TitleId, id: SessionId) => Promise<Session>;
  save: (session: Session) => Promise<void>;
}

export const ISessionRepositorySymbol = Symbol('ISessionRepository');
