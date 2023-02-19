import { Inject } from '@nestjs/common';
import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import ITitleServerRepository, { ITitleServerRepositorySymbol } from 'src/domain/repositories/ITitleServerRepository';
import { GetTitleServersQuery } from '../queries/GetTitleServersQuery';

@QueryHandler(GetTitleServersQuery)
export class GetTitleServersQueryHandler
  implements IQueryHandler<GetTitleServersQuery>
{
  constructor(
    @Inject(ITitleServerRepositorySymbol)
    private repository: ITitleServerRepository,
  ) {}

  async execute(query: GetTitleServersQuery) {
    return this.repository.findTitleServers(query.title);
  }
}
