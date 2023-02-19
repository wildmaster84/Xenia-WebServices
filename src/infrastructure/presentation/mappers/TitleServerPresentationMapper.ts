import TitleServer from '../../../domain/aggregates/TitleServer';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { Inject, Injectable } from '@nestjs/common';
import { TitleServerDto } from '../../persistance/dtos/TitleServerDto';

@Injectable()
export default class TitleServerPresentationMapper {
  constructor(@Inject(ILoggerSymbol) private readonly logger: ILogger) {}

  public mapToPresentationModel(titleServer: TitleServer): TitleServerDto {
    return {
      address: titleServer.address,
      flags: titleServer.flags,
      description: titleServer.description,
    };
  }
}
