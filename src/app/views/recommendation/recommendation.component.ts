import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Crud } from '../../../../shared/helpers/crud';
import { RecommendationDialogComponent } from '../../dialogs/recommendation-dialog/recommendation-dialog.component';
import { TagModule } from 'primeng/tag';
import { RecommendationQueryFilter, RecommendationRequest, RecommendationResponse } from '../../interfaces/recommendation';
import { RecommendationService } from '../../core/services/recommendation.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { EmployeeService } from '../../core/services/employee.service';
import { EmployeeResponse } from '../../interfaces/employee';
import { InputTextModule } from 'primeng/inputtext';
import { CellXSLX, ColumnXSLX } from '../../interfaces/report';
import { ReportService } from '../../../../shared/services/report.service';

@Component({
  selector: 'app-recommendation',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, FormsModule, DropdownModule, InputTextModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './recommendation.component.html',
  styleUrl: './recommendation.component.scss'
})
export class RecommendationComponent extends Crud<RecommendationRequest, RecommendationResponse, RecommendationQueryFilter> implements OnInit {
  module = 'Registros'
  icon = 'pi-list'
  prevLinks = ['Home', 'Recomendaciones']
  activeLink = 'Registros'
  dialogConfig: DynamicDialogConfig;
  defaultHeader: string = 'Nueva Recomendación';
  employees: EmployeeResponse[]

  columnCellsXLSX: ColumnXSLX[] = [
    { column: 1, width: 28 },
    { column: 2, width: 40 },
    { column: 3, width: 40 },
    { column: 4, width: 20 },
  ]

  tableColumnsXLSX: Array<any> = [
    { name: '#', filterButton: true, },
    { name: 'Empleado que Recomendó', filterButton: true },
    { name: 'Empleado Recomendado', filterButton: true },
    { name: 'Monto', filterButton: true },
  ]

  tableColumnsPDF: Array<any> = [
    {
      header: '#',
    },
    {
      header: 'Empleado que Recomendó',
    },
    {
      header: 'Empleado Recomendado',
    },
    {
      header: 'Monto',
    },
  ]

  filterColumnsPDF: Array<any> = [
    {
      header: 'Empleado que Recomendó',
      dataKey: 'employee.name',
    },
    {
      header: 'Empleado Recomendado',
      dataKey: 'employee_recommended.name',
    },
    {
      header: 'Monto',
      dataKey: 'amount',
    },
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: RecommendationService,
    public messageService: MessageService,
    private employeeService: EmployeeService,
    private reportService: ReportService
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
    return this.dialogService.open(RecommendationDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      id_recommended_employee: 0,
      amount: 300,
    }
  }

  protected restoreFilters() {
    this.filters = {
      id_employee: {
        property: 'id_employee',
        label: 'Empleado que Recomendó',
        value: null
      },
      id_recommended_employee: {
        property: 'id_recommended_employee',
        label: 'Empleado Recomendado',
        value: null
      },
      amount: {
        property: 'amount',
        label: 'Monto Bonificación',
        value: null
      },
    }
  }

  ngOnInit(): void {
    this.employeeService.all().subscribe(response => this.employees = response.data)
  }

  xlsx() {

    const filterCellsXLSX: CellXSLX[] = [
      { cell: 'A3', value: 'Empleado que Recomendó:', bold: true },
      { cell: 'A4', value: 'Empleado Recomendado:', bold: true },
      { cell: 'A5', value: 'Monto:', bold: true },
      { cell: 'B3', value: `${document.getElementById('id_employee')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'B4', value: `${document.getElementById('id_recommended_employee')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'B5', value: `${this.filters['amount'].value ?? 'Sin seleccionar'}`, bold: false },

    ]

    const rows: Array<any> = [];
    this.entities.forEach((item, index) => {
      rows.push([
        index + 1,
        `${item.employee.name} ${item.employee.sure_name} ${item.employee.last_name}`,
        `${item.recommended_employee.name} ${item.recommended_employee.sure_name} ${item.recommended_employee.last_name}`,
        item.amount,
      ])
    })

    this.reportService.generateXLSX(
      'Recomendaciones',
      'A1:E1',
      'Recomendaciones',
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
        `${document.getElementById('id_recommended_employee')?.textContent ?? 'Sin seleccionar'}`,
        `${this.filters['amount'].value ?? 'Sin seleccionar'}`
      ]
    ]

    let index = 1;

    let dataTable = this.entities.map(getDataTable);

    function getDataTable(datos: any) {
      return [
        index++,
        `${datos.employee.name} ${datos.employee.sure_name} ${datos.employee.last_name}`,
        `${datos.recommended_employee.name} ${datos.recommended_employee.sure_name} ${datos.recommended_employee.last_name}`,
        `$${datos.amount}`,
      ];
    }

    this.reportService.generatePDF('Recomendaciones', 'Recomendaciones', this.filterColumnsPDF, dataFilters, this.tableColumnsPDF, dataTable)
  }

}
