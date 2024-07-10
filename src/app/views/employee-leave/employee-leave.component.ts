import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { View } from '../../../../shared/helpers/view';
import { EmployeeLeaveDialogComponent } from '../../dialogs/employee-leave-dialog/employee-leave-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { TagModule } from 'primeng/tag';
import { EmployeeLeaveQueryFilter, EmployeeLeaveRequest, EmployeeLeaveResponse } from '../../interfaces/employee-leave';
import { EmployeeLeaveService } from '../../core/services/employee-leave.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { CellXSLX, ColumnXSLX } from '../../interfaces/report';
import { DateService } from '../../../../shared/services/date.service';
import { ReportService } from '../../../../shared/services/report.service';
import { TypeLeaveResponse } from '../../interfaces/type-leave';
import { TypeLeaveService } from '../../core/services/type-leave.service';

@Component({
  selector: 'app-employee-leave',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, DropdownModule, InputTextModule, FormsModule, CalendarModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './employee-leave.component.html',
  styleUrl: './employee-leave.component.scss'
})
export class EmployeeLeaveComponent extends Crud<EmployeeLeaveRequest, EmployeeLeaveResponse, EmployeeLeaveQueryFilter> implements OnInit {
  module = 'Bajas'
  icon = 'pi-angle-double-down'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Bajas'
  dialogConfig: DynamicDialogConfig;
  defaultHeader: string = 'Nueva Baja';
  employees: EmployeeResponse[]
  typeLeaves: TypeLeaveResponse[]


  columnCellsXLSX: ColumnXSLX[] = [
    { column: 1, width: 15 },
    { column: 2, width: 40 },
    { column: 3, width: 30 },
    { column: 4, width: 30 },
  ]

  tableColumnsXLSX: Array<any> = [
    { name: '#', filterButton: true, },
    { name: 'Empleado', filterButton: true },
    { name: 'Tipo de baja', filterButton: true },
    { name: 'Fecha de baja', filterButton: true },
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
      header: 'Tipo de baja',
      dataKey: 'type_leave.name',
    },
    {
      header: 'Fecha de baja',
      dataKey: 'leave_date_formatted',
    }
  ]

  filterColumnsPDF: Array<any> = [
    {
      header: 'Empleado',
    },
    {
      header: 'Tipo de Baja',
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
    public service: EmployeeLeaveService,
    public messageService: MessageService,
    private employeeService: EmployeeService,
    private typeLeaveService: TypeLeaveService,
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
    this.typeLeaves = []
  }

  protected getRefDialog() {
    return this.dialogService.open(EmployeeLeaveDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      id_type_leave: 0,
      leave_date: '',
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
      id_type_leave: {
        property: 'id_type_leave',
        label: 'Tipo de Baja',
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
    this.typeLeaveService.all().subscribe(response => this.typeLeaves = response.data)
  }

  xlsx() {

    const filterCellsXLSX: CellXSLX[] = [
      { cell: 'A3', value: 'Empleado:', bold: true },
      { cell: 'A4', value: 'Tipo de Baja:', bold: true },
      { cell: 'C3', value: 'Año:', bold: true },
      { cell: 'C4', value: 'Fecha Inicio:', bold: true },
      { cell: 'C5', value: 'Fecha Final:', bold: true },
      { cell: 'B3', value: `${this.employees.find(x => x.id == this.filters['id_employee'].value) ? this.employees.find(x => x.id == this.filters['id_employee'].value)?.full_name : 'Sin seleccionar'}`, bold: false },
      { cell: 'B4', value: `${this.typeLeaves.find(x => x.id == this.filters['id_type_leave'].value) ? this.typeLeaves.find(x => x.id == this.filters['id_type_leave'].value)?.name : 'Sin seleccionar'}`, bold: false },
      { cell: 'D3', value: `${this.filters['year'].value ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'D4', value: `${this.filters['start_date'].value ? this.dateService.dateFormatted(this.filters['start_date'].value) : 'Sin seleccionar'}`, bold: false },
      { cell: 'D5', value: `${this.filters['end_date'].value ? this.dateService.dateFormatted(this.filters['end_date'].value) : 'Sin seleccionar'}`, bold: false },
    ]

    const rows: Array<any> = [];
    this.entities.forEach((item, index) => {
      rows.push([
        index + 1,
        `${item.employee.name} ${item.employee.sure_name} ${item.employee.last_name}`,
        item.type_leave.name,
        item.leave_date_formatted
      ])
    })

    this.reportService.generateXLSX(
      'Bajas',
      'A1:D1',
      'Bajas',
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
        `${this.employees.find(x => x.id == this.filters['id_employee'].value) ? this.employees.find(x => x.id == this.filters['id_employee'].value)?.full_name : 'Sin seleccionar'}`,
        `${this.typeLeaves.find(x => x.id == this.filters['id_type_leave'].value) ? this.typeLeaves.find(x => x.id == this.filters['id_type_leave'].value)?.name : 'Sin seleccionar'}`,
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
        datos.type_leave.name,
        datos.leave_date_formatted,
      ];
    }

    this.reportService.generatePDF('Bajas', 'Bajas', this.filterColumnsPDF, dataFilters, this.tableColumnsPDF, dataTable)
  }

}
