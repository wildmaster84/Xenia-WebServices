import {
  Controller,
  Get,
  Req,
  Inject,
  Post,
} from '@nestjs/common';
import * as requestIp from 'request-ip';
import ILogger, { ILoggerSymbol } from '../../../ILogger';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Delete, Ip, Query } from '@nestjs/common/decorators';
import axios from 'axios';
import { GetIPAddress } from '../../../decorators/client-ip.decorator';
import IpAddress from 'src/domain/value-objects/IpAddress';
import { DeleteSessionCommand } from 'src/application/commands/DeleteSessionCommand';

@ApiTags('XNet')
@Controller()
export class XNetController {
  constructor(
    @Inject(ILoggerSymbol) private readonly logger: ILogger,
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get('/whoami')
  async getClientAddress(@GetIPAddress() IPAddress : string, @Req() request: Request) {
    // console.log(IPAddress); // Null??

    const ip = requestIp.getClientIp(request);

    const splitIp = ip.split(':');
    let ipv4 = splitIp[splitIp.length - 1];

    console.log("whoami was: " + ip);
    
    if (ipv4 == "127.0.0.1" || ipv4.startsWith("192.168") || ipv4.split(".")[0] == "10") {
      // Hi me! Who are you?
      const res = await axios.get("https://api.ipify.org/");
      ipv4 = res.data;
    }

    console.log("whoami now: " + ipv4);

    return { address: ipv4 };
  }

  @Delete('/DeleteSessions')
  @ApiQuery({ name: "hostAddress", description: "Host IP Address", required: false})
  async deleteAllSessions(
    @Req() request: Request,
    @Query('hostAddress') hostAddress?: string
  ) {
    const ip = requestIp.getClientIp(request);
    
    const splitIp = ip.split(':');
    let ipv4 = splitIp[splitIp.length - 1];

    if (hostAddress) {
      ipv4 = hostAddress;
    }

    if (ipv4 == "127.0.0.1" || ipv4.startsWith("192.168") || ipv4.split(".")[0] == "10") {
      console.log("Resolving local IP");

      // Hi me! Who are you?
      const res = await axios.get("https://api.ipify.org/");
      ipv4 = res.data;
    }

    // hmm two nulls
    await this.commandBus.execute(
      new DeleteSessionCommand(null, null, new IpAddress(ipv4)),
    );
  }
}