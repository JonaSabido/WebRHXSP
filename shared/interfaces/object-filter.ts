export interface ObjectFilter<T> {
    property: keyof T,
    label: string,
    value: string | number 
}