import { TinyTypeOf } from 'tiny-types';

export default class PropertyId extends TinyTypeOf<number>() {
  public constructor(value: string) {
    super(Number(`0x${value}`));
  }

  public toString(): string {
    return `0x${this.value.toString(16).toLowerCase()}`;
  }
}
