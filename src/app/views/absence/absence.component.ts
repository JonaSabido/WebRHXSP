import { Component, OnInit } from '@angular/core';
import { Crud } from '../../../../shared/helpers/crud';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AbsenceDialogComponent } from '../../dialogs/absence-dialog/absence-dialog.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { AbsenceQueryFilter, AbsenceRequest, AbsenceResponse } from '../../interfaces/absence';
import { MessageService } from 'primeng/api';
import { EmployeeResponse } from '../../interfaces/employee';
import { TypeAbsenceResponse } from '../../interfaces/type-absence';
import { AbsenceService } from '../../core/services/absence.service';
import { EmployeeService } from '../../core/services/employee.service';
import { TypeAbsenceService } from '../../core/services/type-absence.service';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { JobResponse } from '../../interfaces/job';
import { JobService } from '../../core/services/job.service';
import { InputTextModule } from 'primeng/inputtext';
import { CellXSLX, ColumnXSLX } from '../../interfaces/report';
import { ReportService } from '../../../../shared/services/report.service';
import { DateService } from '../../../../shared/services/date.service';

@Component({
  selector: 'app-absence',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, FormsModule, DropdownModule, CalendarModule, InputTextModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './absence.component.html',
  styleUrl: './absence.component.scss'
})
export class AbsenceComponent extends Crud<AbsenceRequest, AbsenceResponse, AbsenceQueryFilter> implements OnInit {
  module = 'Registros'
  icon = 'pi-list'
  prevLinks = ['Home', 'Faltas']
  activeLink = 'Registros'
  dialogConfig: DynamicDialogConfig;
  defaultHeader: string = 'Nueva Falta';
  employees: EmployeeResponse[]
  typeAbsences: TypeAbsenceResponse[]
  jobs: JobResponse[]

  columnCellsXLSX: ColumnXSLX[] = [
    { column: 1, width: 15 },
    { column: 2, width: 40 },
    { column: 3, width: 30 },
    { column: 4, width: 30 },
    { column: 5, width: 30 },
  ]
  tableColumnsXLSX: Array<any> = [
    { name: '#', filterButton: true, },
    { name: 'Empleado', filterButton: true },
    { name: 'Trabajo', filterButton: true },
    { name: 'Fecha', filterButton: true },
    { name: 'Tipo de falta', filterButton: true },
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
      header: 'Trabajo',
      dataKey: 'job',
    },
    {
      header: 'Fecha',
      dataKey: 'date_formatted',
    },
    {
      header: 'Tipo de falta',
      dataKey: 'type_absence',
    }
  ]

  filterColumnsPDF: Array<any> = [
    {
      header: 'Empleado',
    },
    {
      header: 'Tipo de falta',
    },
    {
      header: 'Trabajo',
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
    public service: AbsenceService,
    public messageService: MessageService,
    private employeeService: EmployeeService,
    private typeAbsenceService: TypeAbsenceService,
    private jobService: JobService,
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
    this.typeAbsences = []
    this.jobs = []
  }

  protected getRefDialog() {
    return this.dialogService.open(AbsenceDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      id_type_absence: 0,
      date: '',
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
      id_type_absence: {
        property: 'id_type_absence',
        label: 'Tipo de falta',
        value: null
      },
      id_job: {
        property: 'id_job',
        label: 'Trabajo del empleado',
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
    this.typeAbsenceService.all().subscribe(response => this.typeAbsences = response.data)
    this.jobService.all().subscribe(response => this.jobs = response.data)
  }

  xlsx() {

    const filterCellsXLSX: CellXSLX[] = [
      { cell: 'A3', value: 'Empleado:', bold: true },
      { cell: 'A4', value: 'Tipo de falta:', bold: true },
      { cell: 'A5', value: 'Trabajo:', bold: true },
      { cell: 'C3', value: 'Año:', bold: true },
      { cell: 'C4', value: 'Fecha Inicio:', bold: true },
      { cell: 'C5', value: 'Fecha Final:', bold: true },
      { cell: 'B3', value: `${document.getElementById('id_employee')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'B4', value: `${document.getElementById('id_type_absence')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'B5', value: `${document.getElementById('id_job')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'D3', value: `${this.filters['year'].value ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'D4', value: `${this.filters['start_date'].value ? this.dateService.dateFormatted(this.filters['start_date'].value) : 'Sin seleccionar'}`, bold: false },
      { cell: 'D5', value: `${this.filters['end_date'].value ? this.dateService.dateFormatted(this.filters['end_date'].value) : 'Sin seleccionar'}`, bold: false },
    ]

    const rows: Array<any> = [];
    this.entities.forEach((item, index) => {
      rows.push([
        index + 1,
        `${item.employee.name} ${item.employee.sure_name} ${item.employee.last_name}`,
        item.job.name,
        item.date_formatted,
        item.type_absence.name,
      ])
    })

    this.reportService.generateXLSX(
      'Faltas',
      'A1:E1',
      'Faltas',
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
        `${document.getElementById('id_employee')?.textContent ?? 'Sin seleccionar'}`,
        `${document.getElementById('id_type_absence')?.textContent ?? 'Sin seleccionar'}`,
        `${document.getElementById('id_job')?.textContent ?? 'Sin seleccionar'}`,
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
        datos.job.name,
        datos.date_formatted,
        datos.type_absence.name,
      ];
    }

    this.reportService.generatePDF('Faltas', 'Faltas', this.filterColumnsPDF, dataFilters, this.tableColumnsPDF, dataTable)
  }

}
