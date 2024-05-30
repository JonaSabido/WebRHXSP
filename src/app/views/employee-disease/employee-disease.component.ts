import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeDiseaseDialogComponent } from '../../dialogs/employee-disease-dialog/employee-disease-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { EmployeeDiseaseQueryFilter, EmployeeDiseaseRequest, EmployeeDiseaseResponse } from '../../interfaces/employee-disease';
import { EmployeeDiseaseService } from '../../core/services/employee-disease.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { DiseaseResponse } from '../../interfaces/disease';
import { DiseaseService } from '../../core/services/disease.service';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CellXSLX, ColumnXSLX } from '../../interfaces/report';
import { ReportService } from '../../../../shared/services/report.service';
import { DateService } from '../../../../shared/services/date.service';

@Component({
  selector: 'app-employee-disease',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, ToastModule, DropdownModule, InputTextModule, FormsModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './employee-disease.component.html',
  styleUrl: './employee-disease.component.scss'
})
export class EmployeeDiseaseComponent extends Crud<EmployeeDiseaseRequest, EmployeeDiseaseResponse, EmployeeDiseaseQueryFilter> implements OnInit {
  module = 'Enfermedades'
  icon = 'pi-heart'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Enfermedades'
  dialogConfig: DynamicDialogConfig;
  employees: EmployeeResponse[]
  diseases: DiseaseResponse[]
  defaultHeader: string = 'Nueva Enfermedad de Empleado';

  columnCellsXLSX: ColumnXSLX[] = [
    { column: 1, width: 15 },
    { column: 2, width: 40 },
    { column: 3, width: 40 },
  ]

  tableColumnsXLSX: Array<any> = [
    { name: '#', filterButton: true, },
    { name: 'Empleado', filterButton: true },
    { name: 'Enfermedad', filterButton: true },
  ]

  tableColumnsPDF: Array<any> = [
    {
      header: '#',
    },
    {
      header: 'Empleado',
    },
    {
      header: 'Enfermedad',
    },
  ]

  filterColumnsPDF: Array<any> = [
    {
      header: 'Empleado',
    },
    {
      header: 'Enfermedad',
    }
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: EmployeeDiseaseService,
    public messageService: MessageService,
    private employeeService: EmployeeService,
    private diseaseService: DiseaseService,
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
    this.diseases = []
  }

  protected getRefDialog() {
    return this.dialogService.open(EmployeeDiseaseDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      id_disease: 0
    }
  }

  protected restoreFilters() {
    this.filters = {
      id_employee: {
        property: 'id_employee',
        label: 'Empleado',
        value: null
      },
      id_disease: {
        property: 'id_disease',
        label: 'Enfermedad',
        value: null
      },

    }
  }

  ngOnInit(): void {
    this.employeeService.all().subscribe(response => this.employees = response.data)
    this.diseaseService.all().subscribe(response => this.diseases = response.data)
  }

  xlsx() {

    const filterCellsXLSX: CellXSLX[] = [
      { cell: 'A3', value: 'Empleado:', bold: true },
      { cell: 'A4', value: 'Enfermedad:', bold: true },
      { cell: 'B3', value: `${document.getElementById('id_employee')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'B4', value: `${document.getElementById('id_disease')?.textContent ?? 'Sin seleccionar'}`, bold: false },
    ]

    const rows: Array<any> = [];
    this.entities.forEach((item, index) => {
      rows.push([
        index + 1,
        `${item.employee.name} ${item.employee.sure_name} ${item.employee.last_name}`,
        item.disease.name
      ])
    })

    this.reportService.generateXLSX(
      'Enfermedades',
      'A1:C1',
      'Enfermedades',
      filterCellsXLSX,
      this.columnCellsXLSX,
      'C2',
      'A6',
      this.tableColumnsXLSX,
      rows
    );
  }

  pdf() {

    let dataFilters = [
      [
        `${document.getElementById('id_employee')?.textContent ?? 'Sin seleccionar'}`,
        `${document.getElementById('id_disease')?.textContent ?? 'Sin seleccionar'}`,
      ]
    ]

    let index = 1;

    let dataTable = this.entities.map(getDataTable);
    function getDataTable(datos: any) {

      return [
        index++,
        `${datos.employee.name} ${datos.employee.sure_name} ${datos.employee.last_name}`,
        datos.disease.name,
      ];
    }

    this.reportService.generatePDF('Enfermedades', 'Enfermedades', this.filterColumnsPDF, dataFilters, this.tableColumnsPDF, dataTable)
  }
}