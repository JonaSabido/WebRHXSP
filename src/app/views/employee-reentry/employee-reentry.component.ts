import { Component, OnInit, Type } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeReentryDialogComponent } from '../../dialogs/employee-reentry-dialog/employee-reentry-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { TagModule } from 'primeng/tag';
import { EmployeeReentryQueryFilter, EmployeeReentryRequest, EmployeeReentryResponse } from '../../interfaces/employee-reentry';
import { EmployeeReentryService } from '../../core/services/employee-reentry.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { CalendarModule } from 'primeng/calendar';
import { CellXSLX, ColumnXSLX } from '../../interfaces/report';
import { ReportService } from '../../../../shared/services/report.service';
import { DateService } from '../../../../shared/services/date.service';


@Component({
  selector: 'app-employee-reentry',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, DropdownModule, InputTextModule, FormsModule, CalendarModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './employee-reentry.component.html',
  styleUrl: './employee-reentry.component.scss'
})
export class EmployeeReentryComponent extends Crud<EmployeeReentryRequest, EmployeeReentryResponse, EmployeeReentryQueryFilter> implements OnInit {
  module = 'Reingresos'
  icon = 'pi-angle-double-up'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Reingresos'
  dialogConfig: DynamicDialogConfig;
  defaultHeader: string = 'Nuevo Reingreso';
  employees: EmployeeResponse[]

  columnCellsXLSX: ColumnXSLX[] = [
    { column: 1, width: 15 },
    { column: 2, width: 40 },
    { column: 3, width: 30 }
  ]

  tableColumnsXLSX: Array<any> = [
    { name: '#', filterButton: true, },
    { name: 'Empleado', filterButton: true },
    { name: 'Fecha de reingreso', filterButton: true },
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
      header: 'Fecha de reingreso',
      dataKey: 'reentry_date_formatted',
    }
  ]

  filterColumnsPDF: Array<any> = [
    {
      header: 'Empleado',
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
    public service: EmployeeReentryService,
    public messageService: MessageService,
    private employeeService: EmployeeService,
    private reportService: ReportService,
    private dateService: DateService
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
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
    return this.dialogService.open(EmployeeReentryDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      reentry_date: '',
      description: ''
    }
  }

  protected restoreFilters() {
    this.filters = {
      id_employee: {
        property: 'id_employee',
        label: 'Empleado',
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
      { cell: 'A4', value: 'Año:', bold: true },
      { cell: 'A5', value: 'Fecha Inicio:', bold: true },
      { cell: 'A6', value: 'Fecha Final:', bold: true },
      { cell: 'B3', value: `${this.employees.find(x => x.id == this.filters['id_employee'].value) ? this.employees.find(x => x.id == this.filters['id_employee'].value)?.full_name : 'Sin seleccionar'}`, bold: false },
      { cell: 'B4', value: `${this.filters['year'].value ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'B5', value: `${this.filters['start_date'].value ? this.dateService.dateFormatted(this.filters['start_date'].value) : 'Sin seleccionar'}`, bold: false },
      { cell: 'B6', value: `${this.filters['end_date'].value ? this.dateService.dateFormatted(this.filters['end_date'].value) : 'Sin seleccionar'}`, bold: false },
    ]

    const rows: Array<any> = [];
    this.entities.forEach((item, index) => {
      rows.push([
        index + 1,
        `${item.employee.name} ${item.employee.sure_name} ${item.employee.last_name}`,
        item.reentry_date_formatted
      ])
    })

    this.reportService.generateXLSX(
      'Reingresos',
      'A1:C1',
      'Reingresos',
      filterCellsXLSX,
      this.columnCellsXLSX,
      'C2',
      'A8',
      this.tableColumnsXLSX,
      rows
    );
  }


  pdf() {

    let dataFilters = [
      [
        `${this.employees.find(x => x.id == this.filters['id_employee'].value) ? this.employees.find(x => x.id == this.filters['id_employee'].value)?.full_name : 'Sin seleccionar'}`,
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
        datos.reentry_date_formatted,
      ];
    }

    this.reportService.generatePDF('Reingresos', 'Reingresos', this.filterColumnsPDF, dataFilters, this.tableColumnsPDF, dataTable)
  }


}
