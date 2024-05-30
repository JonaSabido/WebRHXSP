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

export interface EmployeeVacationChart {
    year: number;
    month: number;
    dates: string[]
}

export interface EmployeeVacationQueryFilter {
    id_employee: ObjectFilter<EmployeeVacationQueryFilter>,
    id_vacation_time: ObjectFilter<EmployeeVacationQueryFilter>,
    start_year: ObjectFilter<EmployeeVacationQueryFilter>
    start_start_date: ObjectFilter<EmployeeVacationQueryFilter>
    start_end_date: ObjectFilter<EmployeeVacationQueryFilter>
    end_year: ObjectFilter<EmployeeVacationQueryFilter>
    end_start_date: ObjectFilter<EmployeeVacationQueryFilter>
    end_end_date: ObjectFilter<EmployeeVacationQueryFilter>
}
