import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AccountController } from './controllers';

@Module({
  providers: [
    {
      provide: 'ACCOUNT_PACKAGE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'account',
            protoPath: 'src/modules/account/proto/account.proto',
            url: 'localhost:5051',
          },
        });
      },
    },
  ],
  controllers: [AccountController],
})
export class AccountModule {}
