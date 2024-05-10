import { Injectable } from "@angular/core";
import autoTable from 'jspdf-autotable';
import jspdf from 'jspdf';
import { Workbook } from "exceljs";
import { CellXSLX, ColumnXSLX } from "../../src/app/interfaces/report";
import saveAs from "file-saver";
import { DateService } from "./date.service";

@Injectable({
    providedIn: 'root'
})

export class ReportService {
    constructor(
        private dateService: DateService
    ) {

    }

    generateXLSX(fileName: string, cellsForMerge: string, title: string, filterCells: CellXSLX[], columnCells: ColumnXSLX[], cellStartDate: string,
        cellStartTable: string, tableColumns: Array<any>, tableRows: Array<any>) {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(fileName);

        worksheet.mergeCells(cellsForMerge);

        const titleCell = worksheet.getCell('A1');
        titleCell.value = title;
        titleCell.alignment = { vertical: 'middle', horizontal: 'center' };
        // cellA1.font = { bold: true, size: 26, color: { argb: 'FF2003AF' } };
        titleCell.font = { bold: true, size: 22, };

        const dateCell = worksheet.getCell(cellStartDate);
        dateCell.value = `${this.dateService.dateFormatted(new Date())}`;
        dateCell.alignment = { vertical: 'middle', horizontal: 'right' };
        dateCell.font = { size: 12, }

        filterCells.forEach(element => {
            const cell = worksheet.getCell(element.cell)
            cell.value = element.value
            cell.alignment = { vertical: 'middle' }
            cell.font = { bold: element.bold, size: 12, }
        });

        columnCells.forEach(element => {
            worksheet.getColumn(element.column).width = element.width
        });

        worksheet.addTable({
            name: 'Table',
            ref: cellStartTable,
            headerRow: true,
            style: {
                theme: 'TableStyleMedium6',
                showRowStripes: true,
            },
            columns: tableColumns,
            rows: tableRows,
        })

        workbook.xlsx.writeBuffer().then((buffer: any) => {
            const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
            saveAs(blob, `${fileName}.xlsx`);
        });
    }

    generatePDF(fileName: string, title: string, filterColumns: Array<any>, dataFilters: any, tableColumns: Array<any>, dataTable: any, orientation: 'l' | 'p' = 'p') {
        const date = new Date();
        const options = { timeZone: 'America/Mexico_City' };
        date.toLocaleString('es-MX', options);

        const doc = new jspdf({
            orientation: orientation
        });

        var topbarLogo = document.getElementById('topbar-logo') as HTMLCanvasElement;
        var canvas = document.createElement('canvas') as HTMLCanvasElement;
        var ctx = canvas.getContext('2d');

        canvas.width = topbarLogo?.width;
        canvas.height = topbarLogo?.height;
        ctx?.drawImage(topbarLogo, 0, 0);
        var base64Image = canvas.toDataURL();
        doc.addImage(base64Image, 'png', 15, 15, 50, 17);

        autoTable(doc, {
            body: [
                [
                    {
                        content: `${this.dateService.dateFormatted(new Date())}`,
                        styles: {
                            halign: 'right',
                            fontSize: 12,
                        },
                    },
                ],
            ],
            theme: 'plain',
            styles: {},
        });

        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 15,
            body: [
                [
                    {
                        content: title,
                        styles: {
                            halign: 'center',
                            fontSize: 14,
                            fontStyle: 'bold'
                        },
                    },
                ],
            ],
            theme: 'plain',
            styles: {},
        });

        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 5,
            columns: filterColumns,
            body: dataFilters,
            theme: 'plain',
            styles: {
                halign: 'center'
            }
        });

        autoTable(doc, {
            startY: (doc as any).lastAutoTable.finalY + 5,
            columns: tableColumns,
            body: dataTable,
            headStyles: {
                fillColor: '#06B6D4'
            },
        });


        const pageCount = doc.getNumberOfPages();

        for (var i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.text(
                'Página ' + String(i) + ' de ' + String(pageCount),
                210 - 20,
                320 - 30,

            );
        }

        doc.save(`${fileName}.pdf`);
    }



}