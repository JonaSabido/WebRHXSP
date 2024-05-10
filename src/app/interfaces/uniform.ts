import { ObjectFilter } from "../../../shared/interfaces/object-filter";
import { EmployeeResponse } from "./employee";
import { EntityBase } from "./entity-base";

export const UniformTypes = [
    {
        name: 'Nuevo',
        value: 1
    },
    {
        name: 'Reaprovechamiento',
        value: 2
    }
]

export interface UniformRequest {
    id_employee: number,
    type: number,
    delivered_date: string | Date,
    comments: string
}

export interface UniformResponse extends EntityBase {
    id_employee: number,
    type: number,
    delivered_date: string | Date,
    delivered_date_formatted: string,
    comments: string
    employee: EmployeeResponse
}

export interface UniformQueryFilter {
    id_employee: ObjectFilter<UniformQueryFilter>
    type: ObjectFilter<UniformQueryFilter>
    year: ObjectFilter<UniformQueryFilter>
    start_date: ObjectFilter<UniformQueryFilter>
    end_date: ObjectFilter<UniformQueryFilter>
}
