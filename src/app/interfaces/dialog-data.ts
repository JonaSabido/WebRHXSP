export interface DialogData<T, U> {
    entity: T | U | undefined
    type_action: 'Create' | 'Update'
}
