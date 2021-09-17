import { CostSplitDto } from './cost-split.dto';

export class ExpenseEditDto {
  name: string;

  description: string;

  value: number;

  billAt: Date;

  costSplit: CostSplitDto[];
}
