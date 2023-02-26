import IpAddress from 'src/domain/value-objects/IpAddress';
import MacAddress from 'src/domain/value-objects/MacAddress';
import Xuid from 'src/domain/value-objects/Xuid';

export class CreatePlayerCommand {
  constructor(
    public readonly xuid: Xuid,
    public readonly machineId: Xuid,
    public readonly hostAddress: IpAddress,
    public readonly macAddress: MacAddress,
  ) {}
}
