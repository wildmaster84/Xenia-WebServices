import { TinyTypeOf } from 'tiny-types';

export default class MacAddress extends TinyTypeOf<string>() {
  public constructor(value: string) {
    if (!/^[0-9A-Fa-f]+$/.test(value) || value.length != 12) {
      throw new Error('Invalid MAC Address ' + value);
    }

    super(value.toUpperCase());
  }
}
