import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { AntidopingDialogComponent } from '../../dialogs/antidoping-dialog/antidoping-dialog.component';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { Crud } from '../../../../shared/helpers/crud';
import { AntidopingQueryFilter, AntidopingRequest, AntidopingResponse } from '../../interfaces/antidoping';
import { AntidopingService } from '../../core/services/antidoping.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { CardEmployeeFileComponent } from '../../components/card-employee-file/card-employee-file.component';
import { CellXSLX, ColumnXSLX } from '../../interfaces/report';
import { ReportService } from '../../../../shared/services/report.service';
import { DateService } from '../../../../shared/services/date.service';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-antidoping',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, DropdownModule, InputTextModule, FormsModule, CardEmployeeFileComponent, CalendarModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './antidoping.component.html',
  styleUrl: './antidoping.component.scss'
})
export class AntidopingComponent extends Crud<AntidopingRequest, AntidopingResponse, AntidopingQueryFilter> implements OnInit {
  module = 'Antidopings'
  icon = 'pi-ticket'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Antidopings'
  dialogConfig: DynamicDialogConfig;
  defaultHeader: string = 'Nuevo Antidoping';
  employees: EmployeeResponse[]
  filterResultOptions = [{ name: 'Positivo' }, { name: 'Negativo' }]

  columnCellsXLSX: ColumnXSLX[] = [
    { column: 1, width: 15 },
    { column: 2, width: 40 },
    { column: 3, width: 30 },
    { column: 4, width: 75 },
    { column: 5, width: 30 },
  ]

  tableColumnsXLSX: Array<any> = [
    { name: '#', filterButton: true, },
    { name: 'Empleado', filterButton: true },
    { name: 'Resultado', filterButton: true },
    { name: 'Comentarios', filterButton: true },
    { name: 'Fecha', filterButton: true },
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
      header: 'Resultado',
      dataKey: 'result',
    },
    {
      header: 'Comentarios',
      dataKey: 'comments',
    },
    {
      header: 'Fecha',
      dataKey: 'createdAt_formatted',
    }
  ]

  filterColumnsPDF: Array<any> = [
    {
      header: 'Empleado',
    },
    {
      header: 'Resultado',
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
    public service: AntidopingService,
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
    return this.dialogService.open(AntidopingDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      result: '',
      comments: '',
      files: {
        photo: '',
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
      result: {
        property: 'result',
        label: 'Resultado',
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
      { cell: 'A4', value: 'Resultado:', bold: true },
      { cell: 'C3', value: 'Año:', bold: true },
      { cell: 'C4', value: 'Fecha Inicio:', bold: true },
      { cell: 'C5', value: 'Fecha Final:', bold: true },
      { cell: 'B3', value: `${this.employees.find(x => x.id == this.filters['id_employee'].value) ? this.employees.find(x => x.id == this.filters['id_employee'].value)?.full_name : 'Sin seleccionar'}`, bold: false },
      { cell: 'B4', value: `${this.filterResultOptions.find(x => x.name == this.filters['result'].value) ? this.filterResultOptions.find(x => x.name == this.filters['result'].value)?.name : 'Sin seleccionar'}`, bold: false },
      { cell: 'D3', value: `${this.filters['year'].value ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'D4', value: `${this.filters['start_date'].value ? this.dateService.dateFormatted(this.filters['start_date'].value) : 'Sin seleccionar'}`, bold: false },
      { cell: 'D5', value: `${this.filters['end_date'].value ? this.dateService.dateFormatted(this.filters['end_date'].value) : 'Sin seleccionar'}`, bold: false },
    ]

    const rows: Array<any> = [];
    this.entities.forEach((item, index) => {
      rows.push([
        index + 1,
        `${item.employee.name} ${item.employee.sure_name} ${item.employee.last_name}`,
        item.result,
        item.comments,
        item.createdAt_formatted
      ])
    })

    this.reportService.generateXLSX(
      'Antidopings',
      'A1:E1',
      'Antidopings',
      filterCellsXLSX,
      this.columnCellsXLSX,
      'E2',
      'A7',
      this.tableColumnsXLSX,
      rows
    );
  }

  pdf() {

    let dataFilters = [
      [
        `${this.employees.find(x => x.id == this.filters['id_employee'].value) ? this.employees.find(x => x.id == this.filters['id_employee'].value)?.full_name : 'Sin seleccionar'}`,
        `${this.filterResultOptions.find(x => x.name == this.filters['result'].value) ? this.filterResultOptions.find(x => x.name == this.filters['result'].value)?.name : 'Sin seleccionar'}`,
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
        datos.result,
        datos.comments,
        datos.createdAt_formatted
      ];
    }

    this.reportService.generatePDF('Antidopings', 'Antidopings', this.filterColumnsPDF, dataFilters, this.tableColumnsPDF, dataTable)
  }


}
