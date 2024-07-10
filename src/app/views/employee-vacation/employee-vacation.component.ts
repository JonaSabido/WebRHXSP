import { Component, OnInit } from '@angular/core';
import { Crud } from '../../../../shared/helpers/crud';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeVacationDialogComponent } from '../../dialogs/employee-vacation-dialog/employee-vacation-dialog.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { EmployeeVacationQueryFilter, EmployeeVacationRequest, EmployeeVacationResponse } from '../../interfaces/employee-vacation';
import { EmployeeResponse } from '../../interfaces/employee';
import { MessageService } from 'primeng/api';
import { EmployeeVacationService } from '../../core/services/employee-vacation.service';
import { EmployeeService } from '../../core/services/employee.service';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ReportService } from '../../../../shared/services/report.service';
import { DateService } from '../../../../shared/services/date.service';
import { CellXSLX, ColumnXSLX } from '../../interfaces/report';

@Component({
  selector: 'app-employee-vacation',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, FormsModule, DropdownModule, InputTextModule, CalendarModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './employee-vacation.component.html',
  styleUrl: './employee-vacation.component.scss'
})
export class EmployeeVacationComponent extends Crud<EmployeeVacationRequest, EmployeeVacationResponse, EmployeeVacationQueryFilter> implements OnInit {
  module = 'Vacaciones'
  icon = 'pi-list'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Vacaciones'
  dialogConfig: DynamicDialogConfig;
  defaultHeader: string = 'Nueva Vacación';
  employees: EmployeeResponse[]

  columnCellsXLSX: ColumnXSLX[] = [
    { column: 1, width: 20 },
    { column: 2, width: 40 },
    { column: 3, width: 30 },
    { column: 4, width: 30 },
    { column: 5, width: 20 },
  ]

  tableColumnsXLSX: Array<any> = [
    { name: '#', filterButton: true, },
    { name: 'Empleado', filterButton: true },
    { name: 'Inicio de vacación', filterButton: true },
    { name: 'Finalización de vacación', filterButton: true },
    { name: 'Periodo', filterButton: true },
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
      header: 'Inicio de contrato',
      dataKey: 'start_date_formatted',
    },
    {
      header: 'Finalización de contrato',
      dataKey: 'end_date_formatted',
    },
    {
      header: 'Periodo',
      dataKey: 'vacation_time.period',
    }
  ]

  filterColumnsPDF: Array<any> = [
    {
      header: 'Empleado',
    },
    {
      header: 'IC (Año)',
    },
    {
      header: 'IC (Fecha inicio)',
    },
    {
      header: 'IC (Fecha final)',
    },
    {
      header: 'FC (Año)',
    },
    {
      header: 'FC (Fecha inicio)',
    },
    {
      header: 'FC (Fecha final)',
    },
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: EmployeeVacationService,
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
    return this.dialogService.open(EmployeeVacationDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_vacation_time: 0,
      start_date: '',
      end_date: ''
    }
  }

  protected restoreFilters() {
    this.filters = {
      id_employee: {
        property: 'id_employee',
        label: 'Empleado',
        value: null
      },
      // id_vacation_time: {
      //   property: 'id_vacation_time',
      //   label: 'Periodo',
      //   value: null
      // },
      start_year: {
        property: 'start_year',
        label: 'IV (Año)',
        value: null
      },
      start_start_date: {
        property: 'start_start_date',
        label: 'IV (Fecha Inicio)',
        value: null
      },
      start_end_date: {
        property: 'start_end_date',
        label: 'IV (Fecha Final)',
        value: null
      },
      end_year: {
        property: 'end_year',
        label: 'FV (Año)',
        value: null
      },
      end_start_date: {
        property: 'end_start_date',
        label: 'FV (Fecha Inicio)',
        value: null
      },
      end_end_date: {
        property: 'end_end_date',
        label: 'FV (Fecha Final)',
        value: null
      },
    }
  }

  ngOnInit(): void {
    this.employeeService.all().subscribe(response => this.employees = response.data)
  }

  xlsx() {

    const filterCellsXLSX: CellXSLX[] = [
      { cell: 'A3', value: 'Empleado:', bold: true },
      { cell: 'A4', value: 'IC (Año):', bold: true },
      { cell: 'A5', value: 'IC (Fecha inicio):', bold: true },
      { cell: 'A6', value: 'IC (Fecha final):', bold: true },
      { cell: 'B3', value: `${this.employees.find(x => x.id == this.filters['id_employee'].value) ? this.employees.find(x => x.id == this.filters['id_employee'].value)?.full_name : 'Sin seleccionar'}`, bold: false },
      { cell: 'B4', value: `${this.filters['start_year'].value ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'B5', value: `${this.filters['start_start_date'].value ? this.dateService.dateFormatted(this.filters['start_start_date'].value) : 'Sin seleccionar'}`, bold: false },
      { cell: 'B6', value: `${this.filters['start_end_date'].value ? this.dateService.dateFormatted(this.filters['start_end_date'].value) : 'Sin seleccionar'}`, bold: false },
      { cell: 'C3', value: 'FC (Año):', bold: true },
      { cell: 'C4', value: 'FC (Fecha inicio):', bold: true },
      { cell: 'C5', value: 'FC (Fecha final):', bold: true },
      { cell: 'D3', value: `${this.filters['end_year'].value ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'D4', value: `${this.filters['end_start_date'].value ? this.dateService.dateFormatted(this.filters['end_start_date'].value) : 'Sin seleccionar'}`, bold: false },
      { cell: 'D5', value: `${this.filters['end_end_date'].value ? this.dateService.dateFormatted(this.filters['end_end_date'].value) : 'Sin seleccionar'}`, bold: false },

    ]

    const rows: Array<any> = [];
    this.entities.forEach((item, index) => {
      rows.push([
        index + 1,
        `${item.employee.name} ${item.employee.sure_name} ${item.employee.last_name}`,
        item.start_date_formatted,
        item.end_date_formatted,
        item.vacation_time.period,
      ])
    })

    this.reportService.generateXLSX(
      'Vacaciones',
      'A1:E1',
      'Vacaciones',
      filterCellsXLSX,
      this.columnCellsXLSX,
      'E2',
      'A8',
      this.tableColumnsXLSX,
      rows
    );
  }

  pdf() {

    let dataFilters = [
      [
        `${this.employees.find(x => x.id == this.filters['id_employee'].value) ? this.employees.find(x => x.id == this.filters['id_employee'].value)?.full_name : 'Sin seleccionar'}`,
        `${this.filters['start_year'].value ?? 'Sin seleccionar'}`,
        `${this.filters['start_start_date'].value ? this.dateService.dateFormatted(this.filters['start_start_date'].value) : 'Sin seleccionar'}`,
        `${this.filters['start_end_date'].value ? this.dateService.dateFormatted(this.filters['start_end_date'].value) : 'Sin seleccionar'}`,
        `${this.filters['end_year'].value ?? 'Sin seleccionar'}`,
        `${this.filters['end_start_date'].value ? this.dateService.dateFormatted(this.filters['end_start_date'].value) : 'Sin seleccionar'}`,
        `${this.filters['end_end_date'].value ? this.dateService.dateFormatted(this.filters['end_end_date'].value) : 'Sin seleccionar'}`,
      ]
    ]

    let index = 1;

    let dataTable = this.entities.map(getDataTable);
    function getDataTable(datos: any) {

      return [
        index++,
        `${datos.employee.name} ${datos.employee.sure_name} ${datos.employee.last_name}`,
        datos.start_date_formatted,
        datos.end_date_formatted,
        datos.vacation_time.period,
      ];
    }

    this.reportService.generatePDF('Vacaciones', 'Vacaciones', this.filterColumnsPDF, dataFilters, this.tableColumnsPDF, dataTable, 'l')
  }


}
