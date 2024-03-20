import { DepartmentResponse } from "./department"
import { EntityBase } from "./entity-base"
import { JobResponse } from "./job"

export interface EmployeeRequest {
    id_department: number
    id_job: number
    code: number
    name: string
    sure_name: string
    last_name: string
    entry_date: string
    gender: string
    nss: string
    rfc: string
    curp: string
    ssp: boolean
    natal_date: string
    email: string
    phone: string
    shirt_size: string
    pants_size: string
    shoe_size: string
    has_children: boolean
    address: string
    cp: string
    qr_image: string
    status: boolean
}

export interface EmployeeResponse extends EntityBase {
    id_department: number
    id_job: number
    code: number
    name: string
    sure_name: string
    last_name: string
    entry_date: string
    entry_month: string
    entry_year: string
    gender: string
    nss: string
    rfc: string
    curp: string
    ssp: boolean
    natal_date: string
    email: string
    phone: string
    shirt_size: string
    pants_size: number
    shoe_size: number
    has_children: boolean
    address: string
    cp: string
    qr_image: string
    status: boolean
    department: DepartmentResponse
    job: JobResponse
}
