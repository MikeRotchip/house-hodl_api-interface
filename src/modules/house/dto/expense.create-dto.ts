import { CostSplitDto } from './cost-split.dto';

export class ExpenseCreateDto {
  houseId: number;

  name: string;

  description: string;

  value: number;

  period: number;

  costSplits: CostSplitDto[];

  billedAt: Date;
}
