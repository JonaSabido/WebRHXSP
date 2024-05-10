import { ObjectFilter } from "../../../shared/interfaces/object-filter"
import { EntityBase } from "./entity-base"

export interface VacationTimeResponse extends EntityBase {
    id_employee: number;
    start_date: string;
    end_date: string;
    days: number;
    available_days: number;
    period: string
    take_days: number;
}

export interface VacationTimeQueryFilter {
    id_employee: ObjectFilter<VacationTimeQueryFilter>,
}
