import { Module } from '@nestjs/common';
import { ExpenseController, HouseController } from './controllers';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [AuthenticationModule],
  providers: [
    {
      provide: 'EXPENSE_PACKAGE',
      useFactory: () => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: ['expense'],
            protoPath: 'src/modules/house/proto/expense.proto',
            url: 'localhost:5052',
          },
        });
      },
    },
  ],
  controllers: [ExpenseController, HouseController],
})
export class HouseModule {}
