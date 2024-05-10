import { Component, OnInit, Type } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UniformDialogComponent } from '../../dialogs/uniform-dialog/uniform-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { TagModule } from 'primeng/tag';
import { UniformQueryFilter, UniformRequest, UniformResponse, UniformTypes } from '../../interfaces/uniform';
import { UniformService } from '../../core/services/uniform.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { CalendarModule } from 'primeng/calendar';
import { CellXSLX, ColumnXSLX } from '../../interfaces/report';
import { DateService } from '../../../../shared/services/date.service';
import { ReportService } from '../../../../shared/services/report.service';


@Component({
  selector: 'app-uniform',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, DropdownModule, InputTextModule, FormsModule, CalendarModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './uniform.component.html',
  styleUrl: './uniform.component.scss'
})
export class UniformComponent extends Crud<UniformRequest, UniformResponse, UniformQueryFilter> implements OnInit {
  module = 'Uniformes'
  icon = 'pi-gift'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Uniformes'
  dialogConfig: DynamicDialogConfig;
  employees: EmployeeResponse[]
  types = UniformTypes

  columnCellsXLSX: ColumnXSLX[] = [
    { column: 1, width: 15 },
    { column: 2, width: 40 },
    { column: 3, width: 30 },
    { column: 4, width: 30 }
  ]
  tableColumnsXLSX: Array<any> = [
    { name: '#', filterButton: true, },
    { name: 'Empleado', filterButton: true },
    { name: 'Tipo', filterButton: true },
    { name: 'Fecha de entrega', filterButton: true },
  ]

  tableColumnsPDF: Array<any> = [
    {
      header: '#',
      dataKey: 'id',
    },
    {
      header: 'Empleado',
      dataKey: 'employee.name',
    },
    {
      header: 'Tipo',
      dataKey: 'type',
    },
    {
      header: 'Fecha de entrega',
      dataKey: 'delivered_date_formatted',
    }
  ]

  filterColumnsPDF: Array<any> = [
    {
      header: 'Empleado',
    },
    {
      header: 'Tipo',
    },
    {
      header: 'Año',
    },
    {
      header: 'Fecha Inicio',
    },
    {
      header: 'Fecha Final',
    },
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: UniformService,
    public messageService: MessageService,
    private employeeService: EmployeeService,
    private reportService: ReportService,
    private dateService: DateService
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nuevo uniforme',
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
    return this.dialogService.open(UniformDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      type: 0,
      delivered_date: '',
      comments: ''
    }
  }

  protected restoreFilters() {
    this.filters = {
      id_employee: {
        property: 'id_employee',
        label: 'Empleado',
        value: null
      },
      type: {
        property: 'type',
        label: 'Tipo',
        value: null
      },
      year: {
        property: 'year',
        label: 'Año',
        value: null
      },
      start_date: {
        property: 'start_date',
        label: 'Fecha Inicio',
        value: ''
      },
      end_date: {
        property: 'end_date',
        label: 'Fecha Final',
        value: ''
      },
    }
  }

  ngOnInit(): void {
    this.employeeService.all().subscribe(response => this.employees = response.data)
  }


  xlsx() {

    const filterCellsXLSX: CellXSLX[] = [
      { cell: 'A3', value: 'Empleado:', bold: true },
      { cell: 'A4', value: 'Tipo:', bold: true },
      { cell: 'C3', value: 'Año:', bold: true },
      { cell: 'C4', value: 'Fecha Inicio:', bold: true },
      { cell: 'C5', value: 'Fecha Final:', bold: true },
      { cell: 'B3', value: `${document.getElementById('id_employee')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'B4', value: `${document.getElementById('type')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'D3', value: `${this.filters['year'].value ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'D4', value: `${this.filters['start_date'].value ? this.dateService.dateFormatted(this.filters['start_date'].value) : 'Sin seleccionar'}`, bold: false },
      { cell: 'D5', value: `${this.filters['end_date'].value ? this.dateService.dateFormatted(this.filters['end_date'].value) : 'Sin seleccionar'}`, bold: false },
    ]

    const rows: Array<any> = [];
    this.entities.forEach((item, index) => {
      rows.push([
        index + 1,
        `${item.employee.name} ${item.employee.sure_name} ${item.employee.last_name}`,
        item.type == 1 ? 'Nuevo' : 'Reaprovechamiento',
        item.delivered_date_formatted
      ])
    })

    this.reportService.generateXLSX(
      'Uniformes',
      'A1:D1',
      'Uniformes',
      filterCellsXLSX,
      this.columnCellsXLSX,
      'D2',
      'A7',
      this.tableColumnsXLSX,
      rows
    );
  }

  pdf() {

    let dataFilters = [
      [
        `${document.getElementById('id_employee')?.textContent ?? 'Sin seleccionar'}`,
        `${document.getElementById('type')?.textContent ?? 'Sin seleccionar'}`,
        `${this.filters['year'].value ?? 'Sin seleccionar'}`,
        `${this.filters['start_date'].value ? this.dateService.dateFormatted(this.filters['start_date'].value) : 'Sin seleccionar'}`,
        `${this.filters['end_date'].value ? this.dateService.dateFormatted(this.filters['end_date'].value) : 'Sin seleccionar'}`,
      ]
    ]

    let index = 1;

    let dataTable = this.entities.map(getDataTable);
    function getDataTable(datos: any) {

      return [
        index++,
        `${datos.employee.name} ${datos.employee.sure_name} ${datos.employee.last_name}`,
        datos.type == 1 ? 'Nuevo' : 'Reaprovechamiento',
        datos.delivered_date_formatted,
      ];
    }

    this.reportService.generatePDF('Uniformes', 'Uniformes', this.filterColumnsPDF, dataFilters, this.tableColumnsPDF, dataTable)
  }
}
