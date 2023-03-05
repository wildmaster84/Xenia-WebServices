import { TinyTypeOf } from 'tiny-types';

export default class LeaderboardId extends TinyTypeOf<string>() {
  public constructor(value: string | number) {
    if (typeof value == 'string') super(`${parseInt(value) & 0x0000ffff}`);
    else super(`${value & 0x0000ffff}`);
  }
}
