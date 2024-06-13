import { Payment } from "../../../store/interfaces";
import { PeriodStatusEnum } from "../enums";

export interface Period {
    id: string;
    month: number;
    year: number;
    status: PeriodStatusEnum;
    total: number;
    payments: Payment[];
}
export type PeriodObj = { [key: string]: Payment[] };
