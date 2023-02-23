import { Injectable } from '@nestjs/common';
import TitleServer from '../../../domain/aggregates/TitleServer';
import { TitleServer as TitleServerModel } from '../models/TitleServerSchema';

@Injectable()
export default class TitleServerPersistanceMapper {
  public mapToDataModel(titleServer: TitleServer): TitleServerModel {
    return {
      titleId: titleServer.titleId.toString(),
      address: titleServer.address.value,
      flags: titleServer.flags,
      description: titleServer.description,
    };
  }
}