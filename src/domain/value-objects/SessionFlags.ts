import { TinyTypeOf } from 'tiny-types';



export default class SessionFlags extends TinyTypeOf<number>() {
  public constructor(value: number) {
    super(value);
  }

  private isFlagSet(flag: number) {
    if ((this.value & (1 << flag)) > 0)
        return true;
    else
        return false;
  }


  public get advertised(): boolean {
    return this.isFlagSet(3);
  }

  public get isHost(): boolean {
    return this.isFlagSet(0);
  }
}
