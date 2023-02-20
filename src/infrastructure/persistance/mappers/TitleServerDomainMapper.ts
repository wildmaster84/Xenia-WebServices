import { TitleServer as TitleServerModel } from '../models/TitleServerSchema';
import TitleServer from '../../../domain/aggregates/TitleServer';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { Inject, Injectable } from '@nestjs/common';
import TitleId from 'src/domain/value-objects/TitleId';
import Uuid from 'src/domain/value-objects/Uuid';
import IpAddress from 'src/domain/value-objects/IpAddress';

@Injectable()
export default class TitleServerDomainMapper {
  constructor(@Inject(ILoggerSymbol) private readonly logger: ILogger) {}

  public mapToDomainModel(titleServer: TitleServerModel): TitleServer {
    return new TitleServer({
      id: Uuid.create(titleServer.id),
      titleId: new TitleId(titleServer.titleId),
      address: new IpAddress(titleServer.address),
      flags: titleServer.flags,
      description: titleServer.description,
    });
  }
}
