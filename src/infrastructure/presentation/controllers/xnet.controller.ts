import {
  Controller,
  Get,
  Inject,
  Post,
} from '@nestjs/common';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiTags } from '@nestjs/swagger';
import { Ip } from '@nestjs/common/decorators';
import axios from 'axios';

@ApiTags('XNet')
@Controller()
export class XNetController {
  constructor(
    @Inject(ILoggerSymbol) private readonly logger: ILogger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/whoami')
  async getClientAddress(@Ip() ip: string) {
    const splitIp = ip.split(':');
    let ipv4 = splitIp[splitIp.length - 1];

    console.log("whoami was: " + ip);
    
    if (ipv4 == "127.0.0.1" || ipv4.startsWith("192.168") || ipv4.startsWith("10")) {
      // Hi me! Who are you?
      const res = await axios.get("https://api.ipify.org/");
      ipv4 = res.data;
    }

    console.log("whoami now: " + ipv4);

    return { address: ipv4 };
  }
}
