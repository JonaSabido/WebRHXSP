import { EntityBase } from "./entity-base";

export interface AreaRequest {
    name: string
}

export interface AreaResponse extends EntityBase{
    name: string
}
