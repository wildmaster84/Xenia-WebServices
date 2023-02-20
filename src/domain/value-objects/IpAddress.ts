import { TinyTypeOf } from 'tiny-types';

export default class IpAddress extends TinyTypeOf<string>() {
  public constructor(value: string) {
    super(value);
  }
}
