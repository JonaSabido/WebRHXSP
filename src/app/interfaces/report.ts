import { Style } from "exceljs"

export interface CellXSLX {
    cell: string,
    value: string,
    bold: boolean
}

export interface ColumnXSLX {
    column: number
    width: number
    style?: Partial<Style>
}