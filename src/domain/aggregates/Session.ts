import IpAddress from '../value-objects/IpAddress';
import MacAddress from '../value-objects/MacAddress';
import SessionFlags from '../value-objects/SessionFlags';
import SessionId from '../value-objects/SessionId';
import TitleId from '../value-objects/TitleId';
import Xuid from '../value-objects/Xuid';

interface SessionProps {
  id: SessionId;
  titleId: TitleId;
  flags: SessionFlags;
  hostAddress: IpAddress;
  macAddress: MacAddress;
  publicSlotsCount: number;
  privateSlotsCount: number;
  port: number;
  players: Xuid[];
}

interface CreateProps {
  id: SessionId;
  titleId: TitleId;
  flags: SessionFlags;
  hostAddress: IpAddress;
  macAddress: MacAddress;
  publicSlotsCount: number;
  privateSlotsCount: number;
  port: number;
}

interface ModifyProps {
  flags: SessionFlags;
  publicSlotsCount: number;
  privateSlotsCount: number;
}

interface JoinProps {
  xuids: Xuid[];
}

export default class Session {
  private readonly props: SessionProps;

  public constructor(props: SessionProps) {
    this.props = props;
  }

  public static create(props: CreateProps) {
    return new Session({
      ...props,
      players: [],
    });
  }

  public modify(props: ModifyProps) {
    this.props.flags = this.flags.modify(props.flags);
    this.props.privateSlotsCount = props.privateSlotsCount;
    this.props.publicSlotsCount = props.publicSlotsCount;
  }

  public join(props: JoinProps) {
    this.props.players.push(...props.xuids);
  }

  get id() {
    return this.props.id;
  }

  get titleId() {
    return this.props.titleId;
  }

  get hostAddress() {
    return this.props.hostAddress;
  }

  get flags() {
    return this.props.flags;
  }

  get publicSlotsCount() {
    return this.props.publicSlotsCount;
  }

  get privateSlotsCount() {
    return this.props.privateSlotsCount;
  }

  get openPublicSlots() {
    return this.publicSlotsCount - this.players.length;
  }

  get openPrivateSlots() {
    // TODO: Implement
    return 0;
  }

  get filledPublicSlots() {
    return this.publicSlotsCount - this.openPublicSlots;
  }

  get filledPrivateSlots() {
    return this.privateSlotsCount - this.openPrivateSlots;
  }

  get macAddress() {
    return this.props.macAddress;
  }

  get port() {
    return this.props.port;
  }
  
  get players() {
    return this.props.players;
  }
}