import { ObjectFilter } from "../../../shared/interfaces/object-filter"
import { EntityBase } from "./entity-base"

export interface UserRequest {
    name: string
    email: string
    password: string
}

export interface UserResponse extends EntityBase {
    name: string
    email: string
    password: string
    password_confirmation: string
}

export interface UserQueryFilter {
    name: ObjectFilter<UserQueryFilter>
    email: ObjectFilter<UserQueryFilter>
}
