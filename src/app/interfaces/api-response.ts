interface ResponseBase{
    success: true,
    message: string
}

export interface List<T> extends ResponseBase {
    data: T[],
}

export interface SingleEntity<T> extends ResponseBase {
    data: T
}

export interface RowsDeleted extends ResponseBase{
    data: number
}