import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContractDialogComponent } from '../../dialogs/contract-dialog/contract-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { TagModule } from 'primeng/tag';
import { ContractQueryFilter, ContractRequest, ContractResponse } from '../../interfaces/contract';
import { ContractService } from '../../core/services/contract.service';
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
  selector: 'app-contract',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, DropdownModule, InputTextModule, FormsModule, CalendarModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.scss'
})
export class ContractComponent extends Crud<ContractRequest, ContractResponse, ContractQueryFilter> implements OnInit {
  module = 'Contratos'
  icon = 'pi-book'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Contratos'
  dialogConfig: DynamicDialogConfig;
  defaultHeader: string = 'Nuevo Contrato';

  employees: EmployeeResponse[]
  filterStatusOptions = [{ name: 'Vigente', value: 1 }, { name: 'Finalizado', value: 0 }]
  filterTypeOptions = [{ name: 'Determinado', value: 1 }, { name: 'Indeterminado', value: 2 }]

  columnCellsXLSX: ColumnXSLX[] = [
    { column: 1, width: 20 },
    { column: 2, width: 40 },
    { column: 3, width: 20 },
    { column: 4, width: 30 },
    { column: 5, width: 30 },
    { column: 6, width: 20 },
  ]

  tableColumnsXLSX: Array<any> = [
    { name: '#', filterButton: true, },
    { name: 'Empleado', filterButton: true },
    { name: 'Tipo', filterButton: true },
    { name: 'Inicio de contrato', filterButton: true },
    { name: 'Finalización de contrato', filterButton: true },
    { name: 'Status', filterButton: true },
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
      header: 'Inicio de contrato',
      dataKey: 'start_date_formatted',
    },
    {
      header: 'Finalización de contrato',
      dataKey: 'end_date_formatted',
    },
    {
      header: 'Status',
      dataKey: 'status',
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
    {
      header: 'Status',
    },
  ]


  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: ContractService,
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
    return this.dialogService.open(ContractDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      type: 1,
      start_date: '',
      end_date: '',
      status: true,
      files: {
        evidence: '',
      }
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
      status: {
        property: 'status',
        label: 'Status',
        value: null
      },
      start_year: {
        property: 'start_year',
        label: 'IC (Año)',
        value: null
      },
      start_start_date: {
        property: 'start_start_date',
        label: 'IC (Fecha Inicio)',
        value: null
      },
      start_end_date: {
        property: 'start_end_date',
        label: 'IC (Fecha Final)',
        value: null
      },
      end_year: {
        property: 'end_year',
        label: 'FC (Año)',
        value: null
      },
      end_start_date: {
        property: 'end_start_date',
        label: 'FC (Fecha Inicio)',
        value: null
      },
      end_end_date: {
        property: 'end_end_date',
        label: 'FC (Fecha Final)',
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
      { cell: 'A4', value: 'Tipo:', bold: true },
      { cell: 'A5', value: 'IC (Año):', bold: true },
      { cell: 'A6', value: 'IC (Fecha inicio):', bold: true },
      { cell: 'A7', value: 'IC (Fecha final):', bold: true },
      { cell: 'B3', value: `${this.employees.find(x => x.id == this.filters['id_employee'].value) ? this.employees.find(x => x.id == this.filters['id_employee'].value)?.full_name : 'Sin seleccionar'}`, bold: false },
      { cell: 'B4', value: `${this.filterTypeOptions.find(x => x.value == this.filters['type'].value) ? this.filterTypeOptions.find(x => x.value == this.filters['type'].value)?.name : 'Sin seleccionar'}`, bold: false },
      { cell: 'B5', value: `${this.filters['start_year'].value ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'B6', value: `${this.filters['start_start_date'].value ? this.dateService.dateFormatted(this.filters['start_start_date'].value) : 'Sin seleccionar'}`, bold: false },
      { cell: 'B7', value: `${this.filters['start_end_date'].value ? this.dateService.dateFormatted(this.filters['start_end_date'].value) : 'Sin seleccionar'}`, bold: false },
      { cell: 'C3', value: 'Status:', bold: true },
      { cell: 'C4', value: 'FC (Año):', bold: true },
      { cell: 'C5', value: 'FC (Fecha inicio):', bold: true },
      { cell: 'C6', value: 'FC (Fecha final):', bold: true },
      { cell: 'D3', value: `${this.filterStatusOptions.find(x => x.value == this.filters['status'].value) ? this.filterStatusOptions.find(x => x.value == this.filters['status'].value)?.name : 'Sin seleccionar'}`, bold: false },
      { cell: 'D4', value: `${this.filters['end_year'].value ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'D5', value: `${this.filters['end_start_date'].value ? this.dateService.dateFormatted(this.filters['end_start_date'].value) : 'Sin seleccionar'}`, bold: false },
      { cell: 'D6', value: `${this.filters['end_end_date'].value ? this.dateService.dateFormatted(this.filters['end_end_date'].value) : 'Sin seleccionar'}`, bold: false },
    ]

    const rows: Array<any> = [];
    this.entities.forEach((item, index) => {
      rows.push([
        index + 1,
        `${item.employee.name} ${item.employee.sure_name} ${item.employee.last_name}`,
        item.type == 1 ? 'Determinado' : 'Indeterminado',
        item.start_date_formatted,
        item.end_date_formatted,
        item.status ? 'Vigente' : 'Finalizado'
      ])
    })

    this.reportService.generateXLSX(
      'Contratos',
      'A1:E1',
      'Contratos',
      filterCellsXLSX,
      this.columnCellsXLSX,
      'E2',
      'A9',
      this.tableColumnsXLSX,
      rows
    );
  }

  pdf() {

    let dataFilters = [
      [
        `${this.employees.find(x => x.id == this.filters['id_employee'].value) ? this.employees.find(x => x.id == this.filters['id_employee'].value)?.full_name : 'Sin seleccionar'}`,
        `${this.filterTypeOptions.find(x => x.value == this.filters['type'].value) ? this.filterTypeOptions.find(x => x.value == this.filters['type'].value)?.name : 'Sin seleccionar'}`,
        `${this.filters['start_year'].value ?? 'Sin seleccionar'}`,
        `${this.filters['start_start_date'].value ? this.dateService.dateFormatted(this.filters['start_start_date'].value) : 'Sin seleccionar'}`,
        `${this.filters['start_end_date'].value ? this.dateService.dateFormatted(this.filters['start_end_date'].value) : 'Sin seleccionar'}`,
        `${this.filters['end_year'].value ?? 'Sin seleccionar'}`,
        `${this.filters['end_start_date'].value ? this.dateService.dateFormatted(this.filters['end_start_date'].value) : 'Sin seleccionar'}`,
        `${this.filters['end_end_date'].value ? this.dateService.dateFormatted(this.filters['end_end_date'].value) : 'Sin seleccionar'}`,
        `${this.filterStatusOptions.find(x => x.value == this.filters['status'].value) ? this.filterStatusOptions.find(x => x.value == this.filters['status'].value)?.name : 'Sin seleccionar'}`,
      ]
    ]

    let index = 1;

    let dataTable = this.entities.map(getDataTable);
    function getDataTable(datos: any) {

      return [
        index++,
        `${datos.employee.name} ${datos.employee.sure_name} ${datos.employee.last_name}`,
        datos.type == 1 ? 'Determinado' : 'Indeterminado',
        datos.start_date_formatted,
        datos.end_date_formatted,
        datos.status == 1 ? 'Vigente' : 'Finalizado',
      ];
    }

    this.reportService.generatePDF('Contratos', 'Contratos', this.filterColumnsPDF, dataFilters, this.tableColumnsPDF, dataTable, 'l')
  }
}
