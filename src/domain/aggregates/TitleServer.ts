import IpAddress from '../value-objects/IpAddress';
import TitleId from '../value-objects/TitleId';
import Uuid from '../value-objects/Uuid';

interface TitleServerProps {
  id: Uuid;
  titleId: TitleId;
  address: IpAddress;
  flags: number;
  description: string;
}

export default class TitleServer {
  private readonly props: TitleServerProps;

  public constructor(props: TitleServerProps) {
    this.props = Object.freeze(props);
  }

  get id() {
    return this.props.id;
  }

  get titleId() {
    return this.props.titleId;
  }

  get address() {
    return this.props.address;
  }

  get flags() {
    return this.props.flags;
  }

  get description() {
    return this.props.description;
  }

  public static create(props: Omit<TitleServerProps, 'id'>): TitleServer {
    return new TitleServer({ ...props, id: Uuid.create() });
  }
}
