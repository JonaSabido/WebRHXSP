import { Component, OnInit } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { EmergencyDialogComponent } from '../../dialogs/emergency-dialog/emergency-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { EmergencyQueryFilter, EmergencyRequest, EmergencyResponse, typeOptions } from '../../interfaces/emergency';
import { EmergencyService } from '../../core/services/emergency.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { EmployeeResponse } from '../../interfaces/employee';
import autoTable from 'jspdf-autotable';
import jspdf from 'jspdf';
import { ReportService } from '../../../../shared/services/report.service';
import { CellXSLX, ColumnXSLX } from '../../interfaces/report';

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
  defaultHeader: string = 'Nuevo Número de Emergencia';
  typeOptions = typeOptions



  columnCellsXLSX: ColumnXSLX[] = [
    { column: 1, width: 15 },
    { column: 2, width: 40 },
    { column: 3, width: 40 },
    { column: 4, width: 25 },
    { column: 5, width: 25 },
  ]

  tableColumnsXLSX: Array<any> = [
    { name: '#', filterButton: true, },
    { name: 'Empleado', filterButton: true },
    { name: 'Familiar', filterButton: true },
    { name: 'Parentesco', filterButton: true },
    { name: 'Número telefónico', filterButton: true },
  ]

  tableColumnsPDF: Array<any> = [
    {
      header: '#',
    },
    {
      header: 'Empleado',
    },
    {
      header: 'Familiar',
    },
    {
      header: 'Parentesco',
    },
    {
      header: 'Número telefonico',
    },
  ]

  filterColumnsPDF: Array<any> = [
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
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: EmergencyService,
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

  xlsx() {

    const filterCellsXLSX: CellXSLX[] = [
      { cell: 'A3', value: 'Empleado:', bold: true },
      { cell: 'A4', value: 'Familiar:', bold: true },
      { cell: 'A5', value: 'Parentesco:', bold: true },
      { cell: 'B3', value: `${this.employees.find(x => x.id == this.filters['id_employee'].value) ? this.employees.find(x => x.id == this.filters['id_employee'].value)?.full_name : 'Sin seleccionar'}`, bold: false },
      { cell: 'B4', value: `${this.filters['reference_name'].value ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'B5', value: `${this.typeOptions.find(x => x.name == this.filters['type'].value) ? this.typeOptions.find(x => x.name == this.filters['type'].value)?.name : 'Sin seleccionar'}`, bold: false },
    ]

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

    this.reportService.generateXLSX(
      'Numeros_Emergencia',
      'A1:E1',
      'Números de Emergencia',
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
        `${this.filters['reference_name'].value ?? 'Sin seleccionar'}`,
        `${this.typeOptions.find(x => x.name == this.filters['type'].value) ? this.typeOptions.find(x => x.name == this.filters['type'].value)?.name : 'Sin seleccionar'}`
      ]
    ]

    let index = 1;

    let dataTable = this.entities.map(getDataTable);

    function getDataTable(datos: any) {
      return [
        index++,
        `${datos.employee.name} ${datos.employee.sure_name} ${datos.employee.last_name}`,
        datos.reference_name,
        datos.type,
        datos.phone
      ];
    }

    this.reportService.generatePDF('Numeros_Emergencia', 'Números de Emergencia', this.filterColumnsPDF, dataFilters, this.tableColumnsPDF, dataTable)
  }
}