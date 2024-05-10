import { ObjectFilter } from "../../../shared/interfaces/object-filter"
import { EmployeeResponse } from "./employee";
import { EntityBase } from "./entity-base"
import { VacationTimeResponse } from "./vacation-time";

export interface EmployeeVacationRequest {
    id_vacation_time: number;
    start_date: string;
    end_date: string;
}

export interface EmployeeVacationResponse extends EntityBase {
    id_employee: number;
    start_date: string;
    start_date_formatted: string;
    end_date: string;
    end_date_formatted: string;
    available_days: number;
    vacation_time: VacationTimeResponse;
    employee: EmployeeResponse
}

export interface EmployeeVacationQueryFilter {
    id_employee: ObjectFilter<EmployeeVacationQueryFilter>,
    id_vacation_time: ObjectFilter<EmployeeVacationQueryFilter>,
}
