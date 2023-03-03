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

  public modify(flags: SessionFlags): SessionFlags {
    let newFlags = this.value;

    // TODO: Implement
    // There should be some modification here, but I'm unsure which flags are modified.
    // For now it doesn't matter as the advertised/host flags are the only ones we use and don't seem to be modified.
    console.warn("Session flag modification is not implemented!");

    return new SessionFlags(newFlags);
  }


  public get advertised(): boolean {
    // return this.value == 61;
    return this.isFlagSet(3);
  }

  public get isHost(): boolean {
    return this.isFlagSet(0);
  }
}
