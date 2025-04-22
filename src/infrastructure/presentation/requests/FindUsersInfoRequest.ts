import { ApiProperty } from '@nestjs/swagger';

export class FindUsersInfoRequest {
  @ApiProperty({
    example: [['0009000000000000', 'Gamertag']],
    description: 'An array of [string, string] tuples',
    type: 'array',
    items: {
      type: 'array',
      items: { type: 'string' },
      minItems: 1,
      maxItems: 2,
    },
  })
  UsersInfo: Array<[string, string]>; // xuid, gamertag
}
