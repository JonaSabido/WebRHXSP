interface ResponseBase{
    success: true,
    message: string
}

export interface List<U> extends ResponseBase {
    data: U[],
}

export interface SingleEntity<U> extends ResponseBase {
    data: U
}

export interface RowsDeleted extends ResponseBase{
    data: number
}