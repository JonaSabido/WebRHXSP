import { ObjectFilter } from "../../../shared/interfaces/object-filter";
import { EntityBase } from "./entity-base";

export interface NotificationResponse extends EntityBase {
    id_notification_type: number,
    title: string,
    description: string,
    date: string,
    date_formatted: string
}

export interface NotificationUserResponse extends EntityBase {
    id_notification: number,
    id_user: number,
    status: boolean,
    notification: NotificationResponse
}

export interface NotificationUserQueryFilter {
    id_user: ObjectFilter<NotificationUserQueryFilter>,
    status: ObjectFilter<NotificationUserQueryFilter>
}