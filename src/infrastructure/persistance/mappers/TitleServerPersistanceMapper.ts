import { Injectable } from '@nestjs/common';
import TitleServer from '../../../domain/aggregates/TitleServer';
import { TitleServer as TitleServerModel } from '../models/TitleServerSchema';

@Injectable()
export default class TitleServerPersistanceMapper {
  public mapToDataModel(titleServer: TitleServer): TitleServerModel {
    return {
      id: titleServer.id.value,
      TitleId: titleServer.TitleId.toString(),
      address: titleServer.address,
      flags: titleServer.flags,
      description: titleServer.description,
    };
  }
}
