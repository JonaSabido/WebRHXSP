import { DepartmentResponse } from "./department"
import { EntityBase } from "./entity-base"
import { FileName } from "./file-name"
import { JobResponse } from "./job"
import { RecruitmentMethodResponse } from "./recruitment-method"

export interface EmployeeRequest {
    id_department: number
    id_job: number
    id_recruitment_method: number
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
    comments: string
    files: FileName
    status: boolean
}

export interface EmployeeResponse extends EntityBase {
    id_department: number
    id_job: number
    id_recruitment_method: number
    code: number
    full_name: string
    name: string
    sure_name: string
    last_name: string
    entry_date: string
    entry_date_formatted: string
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
    comments: string
    qr_image: string
    status: boolean
    files: FileName
    department: DepartmentResponse
    job: JobResponse
    recruitment_method: RecruitmentMethodResponse
}
