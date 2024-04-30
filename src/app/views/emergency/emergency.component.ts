import { Component, OnInit } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { EmergencyDialogComponent } from '../../dialogs/emergency-dialog/emergency-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { EmergencyQueryFilter, EmergencyRequest, EmergencyResponse } from '../../interfaces/emergency';
import { EmergencyService } from '../../core/services/emergency.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { EmployeeResponse } from '../../interfaces/employee';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';
import { DateService } from '../../../../shared/services/date.service';
import autoTable from 'jspdf-autotable';
import jspdf from 'jspdf';

@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, ToastModule, DropdownModule, InputTextModule, FormsModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './emergency.component.html',
  styleUrl: './emergency.component.scss'
})
export class EmergencyComponent extends Crud<EmergencyRequest, EmergencyResponse, EmergencyQueryFilter> implements OnInit {
  module = 'Números de emergencia'
  icon = 'pi-phone'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Números de emergencia'
  dialogConfig: DynamicDialogConfig;
  employees: EmployeeResponse[]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: EmergencyService,
    public messageService: MessageService,
    private employeeService: EmployeeService,
    private dateService: DateService
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nuevo número de emergencia',
      closeOnEscape: true,
      closable: true,
      width: '50%',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    }
    this.selectedOption = 'id_employee'
    this.employees = []
  }

  protected getRefDialog() {
    return this.dialogService.open(EmergencyDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      reference_name: '',
      type: '',
      phone: ''
    }
  }

  protected restoreFilters() {
    this.filters = {
      id_employee: {
        property: 'id_employee',
        label: 'Empleado',
        value: null
      },
      reference_name: {
        property: 'reference_name',
        label: 'Familiar',
        value: null
      },
      type: {
        property: 'type',
        label: 'Parentesco',
        value: ''
      },
    }
  }

  ngOnInit(): void {
    this.employeeService.all().subscribe(response => this.employees = response.data)
  }

  generateXLSX() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('Numeros_Emergencia');

    worksheet.mergeCells('A1:E1');


    const cellA1 = worksheet.getCell('A1');
    cellA1.value = `Números de Emergencia`;
    cellA1.alignment = { vertical: 'middle', horizontal: 'center' };
    // cellA1.font = { bold: true, size: 26, color: { argb: 'FF2003AF' } };
    cellA1.font = { bold: true, size: 22, };

    const cellA3 = worksheet.getCell('A3');
    cellA3.value = `Empleado: `;
    cellA3.alignment = { vertical: 'middle', };
    cellA3.font = { bold: true, size: 12, }

    const cellB3 = worksheet.getCell('B3');
    cellB3.value = `${document.getElementById('id_employee')?.textContent ?? 'Sin seleccionar'}`;
    cellB3.alignment = { vertical: 'middle', };
    cellB3.font = { size: 12, }

    const cellA4 = worksheet.getCell('A4');
    cellA4.value = `Familiar: `;
    cellA4.alignment = { vertical: 'middle', };
    cellA4.font = { bold: true, size: 12, }

    const cellB4 = worksheet.getCell('B4');
    cellB4.value = `${document.getElementById('reference_name')?.textContent ?? 'Sin seleccionar'}`;
    cellB4.alignment = { vertical: 'middle', };
    cellB4.font = { size: 12, }

    const cellA5 = worksheet.getCell('A5');
    cellA5.value = `Parentesco: `;
    cellA5.alignment = { vertical: 'middle', };
    cellA5.font = { bold: true, size: 12, }

    const cellB5 = worksheet.getCell('B5');
    cellB5.value = `${document.getElementById('type')?.textContent ?? 'Sin seleccionar'}`;
    cellB5.alignment = { vertical: 'middle', };
    cellB5.font = { size: 12, }

    const cellE2 = worksheet.getCell('E2');
    cellE2.value = `${this.dateService.dateFormatted(new Date())}`;
    cellE2.alignment = { vertical: 'middle', horizontal: 'right' };
    cellE2.font = { size: 12, }



    worksheet.getColumn(1).width = 15;
    worksheet.getColumn(2).width = 40;
    worksheet.getColumn(3).width = 25;
    worksheet.getColumn(4).width = 25;
    worksheet.getColumn(5).width = 25;


    const rows: Array<any> = [];
    this.entities.forEach((item, index) => {
      rows.push([
        index + 1,
        `${item.employee.name} ${item.employee.sure_name} ${item.employee.last_name}`,
        item.reference_name,
        item.type,
        item.phone
      ])
    })

    const table = worksheet.addTable({
      name: 'AttendanceTable',
      ref: 'A7',
      headerRow: true,
      style: {
        theme: 'TableStyleMedium6',
        showRowStripes: true,

      },
      columns: [
        { name: '#', filterButton: true, },
        { name: 'Empleado', filterButton: true },
        { name: 'Familiar', filterButton: true },
        { name: 'Parentesco', filterButton: true },
        { name: 'Número telefónico', filterButton: true },
      ],
      rows: rows,
    })

    workbook.xlsx.writeBuffer().then((buffer: any) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      saveAs(blob, `Numeros_Emergencia.xlsx`);
    });
  }

  generatePDF() {

    const date = new Date();
    const options = { timeZone: 'America/Mexico_City' };
    date.toLocaleString('es-MX', options);
    let output =
      String(date.getDate()).padStart(2, '0') +
      '-' +
      String(date.getMonth() + 1).padStart(2, '0') +
      '-' +
      date.getFullYear();
    let total = 0;
    let test = this.entities.map(getdata);
    function getdata(datos: any) {
      return [
        datos.id,
        `${datos.employee.name} ${datos.employee.sure_name} ${datos.employee.last_name}`,
        datos.reference_name,
        datos.type,
        datos.phone
      ];
    }

    const doc = new jspdf();
    // doc.addImage(this.configuration.image_report, 'png', 15, 15, 40, 15);
    // autoTable(doc, {
    //   body: [
    //     [
    //       {
    //         content:
    //           this.configuration.name +
    //           '\n DIRECCIÓN: ' + this.configuration.direction +
    //           '\n TEL: ' + this.configuration.phone,

    //         styles: {
    //           halign: 'right',
    //           fontSize: 10,

    //         },
    //       },

    //       {
    //         content: 'REPORTE DE VENTAS' + '\nFECHA: ' + output,
    //         styles: {
    //           halign: 'center',
    //           fontSize: 10,
    //         },
    //       },
    //     ],
    //   ],
    //   theme: 'plain',
    //   styles: {},
    // });
    var topbarLogo = document.getElementById('topbar-logo') as HTMLCanvasElement;

    // Convertir la imagen a base64
    var canvas = document.createElement('canvas') as HTMLCanvasElement;
    var ctx = canvas.getContext('2d');
    canvas.width = topbarLogo?.width;
    canvas.height = topbarLogo?.height;
    ctx?.drawImage(topbarLogo, 0, 0);
    var base64Image = canvas.toDataURL();
    doc.addImage(base64Image, 'png', 15, 15, 50, 17);

    autoTable(doc, {
      margin: { top: 35 },
      body: [
        [
          {
            content: 'Números de Emergencia',
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
      columns: [
        {
          header: '#',
          dataKey: 'id',
        },
        {
          header: 'Empleado',
          dataKey: 'employee.name',
        },
        {
          header: 'Familiar',
          dataKey: 'reference_name',
        },
        {
          header: 'Parentesco',
          dataKey: 'type',
        },
        {
          header: 'Número telefonico',
          dataKey: 'phone',
        },
      ],
      body: test,
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

    doc.save('Numeros_Emergencia.pdf');
  }
}