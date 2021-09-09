import { MyExpensesDto } from '../dto';
import { Metadata } from '@grpc/grpc-js';

export interface IExpenseService {
  getMyExpenses(myExpensesDto: MyExpensesDto, metadata: Metadata): any;
}
