import { ObjectFilter } from "../../../shared/interfaces/object-filter"
import { DiseaseResponse } from "./disease"
import { EmployeeResponse } from "./employee"
import { EntityBase } from "./entity-base"

export interface EmployeeDiseaseRequest {
    id_employee: number,
    id_disease: number
}

export interface EmployeeDiseaseResponse extends EntityBase {
    id_employee: number,
    id_disease: number,
    employee: EmployeeResponse,
    disease: DiseaseResponse
}

export interface EmployeeDiseaseQueryFilter {
    id_employee: ObjectFilter<EmployeeDiseaseQueryFilter>
    id_disease: ObjectFilter<EmployeeDiseaseQueryFilter>
}