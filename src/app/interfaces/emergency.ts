import { ObjectFilter } from "../../../shared/interfaces/object-filter"
import { EmployeeResponse } from "./employee"
import { EntityBase } from "./entity-base"

export interface EmergencyRequest {
    id_employee: number,
    reference_name: string,
    type: string,
    phone: string
}

export interface EmergencyResponse extends EntityBase {
    id_employee: number,
    reference_name: string,
    type: string,
    phone: string
    employee: EmployeeResponse
}

export interface EmergencyQueryFilter {
    id_employee: ObjectFilter<EmergencyQueryFilter>
    reference_name: ObjectFilter<EmergencyQueryFilter>
    type: ObjectFilter<EmergencyQueryFilter>
}

export const typeOptions = [{ name: 'Padre' }, { name: 'Madre' }, { name: 'Hermano/a' }, { name: 'Hijo/a' }, { name: 'Esposa/o' }, { name: 'Suegro/a' }, { name: 'Compadre/Comadre' }, { name: 'Pareja' }, { name: 'Primo/a' }, { name: 'Tío/a' }, { name: 'Sobrino/a' }, { name: 'Cuñado/a' }, { name: 'Vecino/a' }, { name: 'Conyugue' }, { name: 'Amigo/a' }]