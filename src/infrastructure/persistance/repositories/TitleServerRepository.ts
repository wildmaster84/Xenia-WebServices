import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import ITitleServerRepository from 'src/domain/repositories/ITitleServerRepository';
import TitleServer from 'src/domain/aggregates/TitleServer';
import TitleServerDomainMapper from '../mappers/TitleServerDomainMapper';
import TitleServerPersistanceMapper from '../mappers/TitleServerPersistanceMapper';
import { TitleServerDocument } from '../models/TitleServerSchema';
import TitleId from 'src/domain/value-objects/TitleId';

@Injectable()
export default class TitleServerRepository implements ITitleServerRepository {
  constructor(
    @Inject(ILoggerSymbol) private readonly logger: ILogger,
    @InjectModel(TitleServer.name)
    private TitleServerModel: Model<TitleServerDocument>,
    private readonly titleServerDomainMapper: TitleServerDomainMapper,
    private readonly titleServerPersistanceMapper: TitleServerPersistanceMapper,
  ) {}

  public async findTitleServers(id: TitleId) {
    const titleServers = await this.TitleServerModel.find({ titleId: id.toString() });
     
    return titleServers.map(this.titleServerDomainMapper.mapToDomainModel)
  }
}
