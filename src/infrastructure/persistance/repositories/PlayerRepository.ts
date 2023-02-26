import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import IPlayerRepository from 'src/domain/repositories/IPlayerRepository';
import Player from 'src/domain/aggregates/Player';
import PlayerDomainMapper from '../mappers/PlayerDomainMapper';
import PlayerPersistanceMapper from '../mappers/PlayerPersistanceMapper';
import { PlayerDocument } from '../models/PlayerSchema';
import Xuid from 'src/domain/value-objects/Xuid';
import IpAddress from 'src/domain/value-objects/IpAddress';

@Injectable()
export default class PlayerRepository implements IPlayerRepository {
  constructor(
    @Inject(ILoggerSymbol) private readonly logger: ILogger,
    @InjectModel(Player.name)
    private PlayerModel: Model<PlayerDocument>,
    private readonly playerDomainMapper: PlayerDomainMapper,
    private readonly playerPersistanceMapper: PlayerPersistanceMapper,
  ) {}

  public async save(player: Player) {
    await this.PlayerModel.findOneAndUpdate(
      {
        xuid: player.xuid.value,
      },
      this.playerPersistanceMapper.mapToDataModel(player),
      {
        upsert: true,
        new: true,
      },
    );
  }

  public async findByXuid(xuid: Xuid) {
    const player = await this.PlayerModel.findOne({
      xuid: xuid.value,
    });

    if (!player) return undefined;

    return this.playerDomainMapper.mapToDomainModel(player);
  }

  public async findByAddress(ip: IpAddress) {
    const player = await this.PlayerModel.findOne({
      hostAddress: ip.value,
    });

    if (!player) return undefined;

    return this.playerDomainMapper.mapToDomainModel(player);
  }
}
