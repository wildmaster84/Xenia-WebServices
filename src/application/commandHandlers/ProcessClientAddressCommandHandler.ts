import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { ProcessClientAddressCommand } from '../commands/ProcessClientAddressCommand';
import ipaddr from 'ipaddr.js';
import { ConsoleLogger } from '@nestjs/common';

@CommandHandler(ProcessClientAddressCommand)
export class ProcessClientAddressCommandHandler
  implements ICommandHandler<ProcessClientAddressCommand>
{
  constructor(private readonly logger: ConsoleLogger) {
    logger.setContext(ProcessClientAddressCommand.name);
  }

  async execute(command: ProcessClientAddressCommand) {
    let ipv4 = command.ip;

    // Must trim ::ffff: from private IPs because session hostAddress is not in IPv6 format.
    ipv4 = ipaddr.process(ipv4).toString();

    // Use Dynamic Import of ESM
    await import('private-ip').then((is_ip_private) => {
      this.logger.debug(
        `${is_ip_private.default(ipv4) ? 'Private' : 'Public'} IPv4: ${ipv4}`,
      );
    });

    return ipv4;
  }
}
