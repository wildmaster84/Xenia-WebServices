import { TitleServer as TitleServerModel } from '../models/TitleServerSchema';
import TitleServer from '../../../domain/aggregates/TitleServer';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { Inject, Injectable } from '@nestjs/common';
import TitleId from 'src/domain/value-objects/TitleId';
import Uuid from 'src/domain/value-objects/Uuid';

@Injectable()
export default class TitleServerDomainMapper {
  constructor(@Inject(ILoggerSymbol) private readonly logger: ILogger) {}

  public mapToDomainModel(titleServer: TitleServerModel): TitleServer {
    return new TitleServer({
      id: Uuid.create(titleServer.id),
      TitleId: new TitleId(titleServer.TitleId),
      address: titleServer.address,
      flags: titleServer.flags,
      description: titleServer.description,
    });
  }
}
