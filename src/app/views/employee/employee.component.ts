import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EmployeeDialogComponent } from '../../dialogs/employee-dialog/employee-dialog.component';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { Crud } from '../../../../shared/helpers/crud';
import { EmployeeQueryFilter, EmployeeRequest, EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { DepartmentService } from '../../core/services/department.service';
import { JobService } from '../../core/services/job.service';
import { RecruitmentMethodService } from '../../core/services/recruitment-method.service';
import { DepartmentResponse } from '../../interfaces/department';
import { JobResponse } from '../../interfaces/job';
import { RecruitmentMethodResponse } from '../../interfaces/recruitment-method';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { CellXSLX, ColumnXSLX } from '../../interfaces/report';
import { DateService } from '../../../../shared/services/date.service';
import { ReportService } from '../../../../shared/services/report.service';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, AvatarModule, BadgeModule, FormsModule, DropdownModule, CalendarModule, InputTextModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent extends Crud<EmployeeRequest, EmployeeResponse, EmployeeQueryFilter> implements OnInit {
  module = 'Registros'
  icon = 'pi-list'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Registros'
  dialogConfig: DynamicDialogConfig;
  defaultHeader: string = 'Nuevo Empleado';
  departments: DepartmentResponse[]
  jobs: JobResponse[]
  recruitments: RecruitmentMethodResponse[]

  columnCellsXLSX: ColumnXSLX[] = [
    { column: 1, width: 30 },
    { column: 2, width: 20 },
    { column: 3, width: 25 },
    { column: 4, width: 20 },
    { column: 5, width: 20 },
    { column: 6, width: 25 },
    { column: 7, width: 28 },
    { column: 8, width: 25 },
    { column: 9, width: 30 },
    { column: 10, width: 20 },
    { column: 11, width: 20 },
    { column: 12, width: 25 },
    { column: 13, width: 40 },
    { column: 14, width: 90 },
    { column: 15, width: 20 },
    { column: 16, width: 25 },
    { column: 17, width: 25 },
    { column: 18, width: 20 },
    { column: 19, width: 15 },
    { column: 20, width: 25 },
    { column: 21, width: 25 },
    { column: 22, width: 25 },
    { column: 23, width: 25 },
    { column: 24, width: 25 },
    { column: 25, width: 50 },
    { column: 26, width: 25, style: { alignment: { horizontal: 'center' } } },
    { column: 27, width: 25, style: { alignment: { horizontal: 'center' } } },
    { column: 28, width: 29, style: { alignment: { horizontal: 'center' } } },
    { column: 29, width: 29, style: { alignment: { horizontal: 'center' } } },
    { column: 30, width: 25, style: { alignment: { horizontal: 'center' } } },
    { column: 31, width: 25, style: { alignment: { horizontal: 'center' } } },
    { column: 32, width: 25, style: { alignment: { horizontal: 'center' } } },
    { column: 33, width: 25, style: { alignment: { horizontal: 'center' } } },
    { column: 34, width: 25, style: { alignment: { horizontal: 'center' } } },
    { column: 35, width: 25, style: { alignment: { horizontal: 'center' } } },
    { column: 36, width: 25, style: { alignment: { horizontal: 'center' } } },

  ]

  tableColumnsXLSX: Array<any> = [
    { name: '#', filterButton: true, },
    { name: 'Código', filterButton: true, },
    { name: 'Nombre', filterButton: true },
    { name: 'A. Paterno', filterButton: true },
    { name: 'A. Materno', filterButton: true },
    { name: 'Fecha Nacimiento', filterButton: true },
    { name: 'Genero', filterButton: true },
    { name: '¿Tiene hijos?', filterButton: true },
    { name: 'Talla camisa', filterButton: true },
    { name: 'Talla pantalón', filterButton: true },
    { name: 'Talla zapato', filterButton: true },
    { name: 'Teléfono', filterButton: true },
    { name: 'Email', filterButton: true },
    { name: 'Domicilio', filterButton: true },
    { name: 'Código Postal', filterButton: true },
    { name: 'RFC', filterButton: true },
    { name: 'CURP', filterButton: true },
    { name: 'NSS', filterButton: true },
    { name: '¿Alta en SSP?', filterButton: true },
    { name: 'Fecha Ingreso', filterButton: true },
    { name: 'Departamento', filterButton: true },
    { name: 'Trabajo', filterButton: true },
    { name: 'Método de reclutamiento', filterButton: true },
    { name: 'Resultado de Antidoping', filterButton: true },
    { name: 'Comentarios de Antidoping', filterButton: true },
    { name: '¿Acta de nacimiento?', filterButton: true },
    { name: '¿Identificación Oficial?', filterButton: true },
    { name: '¿CURP?', filterButton: true },
    { name: '¿NSS?', filterButton: true },
    { name: '¿Comprobante domiciliario?', filterButton: true },
    { name: '¿Comprobante de estudios?', filterButton: true },
    { name: '¿Comprobante fiscal?', filterButton: true },
    { name: '¿Cartilla militar?', filterButton: true },
    { name: '¿Antecedentes penales?', filterButton: true },
    { name: '¿Certificado médico?', filterButton: true },
    { name: '¿Seguro de vida?', filterButton: true },
  ]

  tableColumnsPDF: Array<any> = [
    { header: '#', dataKey: 'id' },
    { header: 'Código', dataKey: 'code' },
    { header: 'Nombre', dataKey: 'name' },
    { header: 'A. Paterno', dataKey: 'sure_name' },
    { header: 'A. Materno', dataKey: 'last_name' },
    { header: 'Fecha Nacimiento', dataKey: 'natal_date' },
    { header: 'Género', dataKey: 'gender' },
    { header: '¿Tiene hijos?', dataKey: 'has_children' },
    { header: 'Talla camisa', dataKey: 'shirt_size' },
    { header: 'Talla pantalón', dataKey: 'pants_size' },
    { header: 'Talla zapato', dataKey: 'shoe_size' },
    { header: 'Teléfono', dataKey: 'phone' },
    { header: 'Email', dataKey: 'email' },
    { header: 'Domicilio', dataKey: 'address' },
    { header: 'Código Postal', dataKey: 'cp' },
    { header: 'RFC', dataKey: 'rfc' },
    { header: 'CURP', dataKey: 'curp' },
    { header: 'NSS', dataKey: 'nss' },
    { header: '¿Alta en SSP?', dataKey: 'ssp' },
    { header: 'Fecha Ingreso', dataKey: 'entry_date' },
    { header: 'Departamento', dataKey: 'department' },
    { header: 'Trabajo', dataKey: 'job' },
    { header: 'Método de reclutamiento', dataKey: 'recruitment_method' },
    { header: 'Resultados Antidoping', dataKey: 'antidoping?.result' },
    { header: 'Comentarios Antidoping', dataKey: 'antidoping?.comments' },
    // { header: 'Acta de nacimiento', dataKey: 'has_birth_certificate' },
    // { header: 'Identificación Oficial', dataKey: 'has_identification' },
    // { header: 'CURP', dataKey: 'has_curp' },
    // { header: 'NSS', dataKey: 'has_nss' },
    // { header: 'Comprobante domiciliario', dataKey: 'has_address_certification' },
    // { header: 'Comprobante de estudios', dataKey: 'has_studies_certification' },
    // { header: 'Comprobante fiscal', dataKey: 'has_tax_certificate' },
    // { header: 'Cartilla militar', dataKey: 'has_smn' },
    // { header: 'Antecedentes penales', dataKey: 'has_no_criminal_certificate' },
    // { header: 'Certificado médico', dataKey: 'has_health_certificate' },
    // { header: 'Seguro de vida', dataKey: 'has_sv' },
  ];

  filterColumnsPDF: Array<any> = [
    { header: 'Departamento' },
    { header: 'Trabajo' },
    { header: 'Método de Reclutamiento' },
    { header: 'Código' },
    { header: 'Nombre' },
    { header: 'Apellido Paterno' },
    { header: 'Apellido Materno' },
    { header: 'Ingreso (FI)' },
    { header: 'Ingreso (FF)' },
    { header: 'Estatus' },
    { header: 'Género' },
    { header: 'SSP' },
    { header: 'Tiene Hijos' },
    { header: 'Nacimiento (FI)' },
    { header: 'Nacimiento (FF)' },
  ];

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: EmployeeService,
    public messageService: MessageService,
    private departmentService: DepartmentService,
    private jobService: JobService,
    private recruitmentMethodService: RecruitmentMethodService,
    private reportService: ReportService,
    private dateService: DateService
  ) {
    super(dialogService, refDialog, service, messageService)
    this.departments = []
    this.jobs = []
    this.recruitments = []
    this.dialogConfig = {
      closeOnEscape: true,
      closable: true,
      width: '95%',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    }
    this.selectedOption = 'id_department'
  }

  protected getRefDialog() {
    return this.dialogService.open(EmployeeDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_department: 0,
      id_job: 0,
      id_recruitment_method: 0,
      code: 0,
      name: "",
      sure_name: "",
      last_name: "",
      entry_date: "",
      gender: "Otro",
      nss: "",
      rfc: "",
      curp: "",
      ssp: false,
      natal_date: "",
      email: "",
      phone: "",
      shirt_size: "",
      pants_size: "",
      shoe_size: "",
      has_children: false,
      address: "",
      cp: "",
      comments: "",
      has_birth_certificate: false,
      has_identification: false,
      has_curp: false,
      has_nss: false,
      has_address_certification: false,
      has_studies_certification: false,
      has_tax_certificate: false,
      has_smn: false,
      has_no_criminal_certificate: false,
      has_health_certificate: false,
      has_sv: false,
      status: true,
      files: {
        birth_certificate: '',
        identification: '',
        curp: '',
        nss: '',
        address_certification: '',
        studies_certification: '',
        tax_certificate: '',
        smn: '',
        no_criminal_certificate: '',
        health_certificate: '',
        sv: '',
        qr_image: '',
        employee_image: '',
      }
    }

  }

  protected restoreFilters() {
    this.filters = {
      id_department: {
        property: 'id_department',
        label: 'Departamento',
        value: null
      },
      id_job: {
        property: 'id_job',
        label: 'Trabajo',
        value: null
      },
      id_recruitment_method: {
        property: 'id_recruitment_method',
        label: 'Método de Reclutamiento',
        value: null
      },
      code: {
        property: 'code',
        label: 'Código',
        value: null
      },
      name: {
        property: 'name',
        label: 'Nombre',
        value: null
      },
      sure_name: {
        property: 'sure_name',
        label: 'Apellido Paterno',
        value: null
      },
      last_name: {
        property: 'last_name',
        label: 'Apellido Materno',
        value: null
      },
      entry_start_date: {
        property: 'entry_start_date',
        label: 'Ingreso (FI)',
        value: null
      },
      entry_end_date: {
        property: 'entry_end_date',
        label: 'Ingreso (FF)',
        value: null
      },
      status: {
        property: 'status',
        label: 'Estatus',
        value: null
      },
      gender: {
        property: 'gender',
        label: 'Genero',
        value: null
      },
      ssp: {
        property: 'ssp',
        label: 'SSP',
        value: null
      },
      has_children: {
        property: 'has_children',
        label: 'Tiene Hijos',
        value: null
      },
      natal_start_date: {
        property: 'natal_start_date',
        label: 'Nacimiento (FI)',
        value: null
      },
      natal_end_date: {
        property: 'natal_end_date',
        label: 'Nacimiento (FF)',
        value: null
      },
      has_birth_certificate: {
        property: 'has_birth_certificate',
        label: 'Acta de nacimiento',
        value: null
      },
      has_identification: {
        property: 'has_identification',
        label: 'Identificación Oficial',
        value: null
      },
      has_curp: {
        property: 'has_curp',
        label: 'CURP',
        value: null
      },
      has_nss: {
        property: 'has_nss',
        label: 'NSS',
        value: null
      },
      has_address_certification: {
        property: 'has_address_certification',
        label: 'Comprobante domiciliario',
        value: null
      },
      has_studies_certification: {
        property: 'has_studies_certification',
        label: 'Comprobante de estudios',
        value: null
      },
      has_tax_certificate: {
        property: 'has_tax_certificate',
        label: 'Comprobante fiscal',
        value: null
      },
      has_smn: {
        property: 'has_smn',
        label: 'Cartilla militar',
        value: null
      },
      has_no_criminal_certificate: {
        property: 'has_no_criminal_certificate',
        label: 'Antecedentes penales',
        value: null
      },
      has_health_certificate: {
        property: 'has_health_certificate',
        label: 'Certificado médico',
        value: null
      },
      has_sv: {
        property: 'has_sv',
        label: 'Seguro de vida',
        value: null
      }
    }
  }


  ngOnInit(): void {
    this.departmentService.all().subscribe(response => this.departments = response.data)
    this.jobService.all().subscribe(response => this.jobs = response.data)
    this.recruitmentMethodService.all().subscribe(response => this.recruitments = response.data)
  }

  xlsx() {
    const filterCellsXLSX: CellXSLX[] = [
      { cell: 'A3', value: 'Departamento:', bold: true },
      { cell: 'B3', value: `${document.getElementById('id_department')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'A4', value: 'Trabajo:', bold: true },
      { cell: 'B4', value: `${document.getElementById('id_job')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'A5', value: 'Método de Reclutamiento:', bold: true },
      { cell: 'B5', value: `${document.getElementById('id_recruitment_method')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'A6', value: 'Código:', bold: true },
      { cell: 'B6', value: `${this.filters['code'].value ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'A7', value: 'Nombre:', bold: true },
      { cell: 'B7', value: `${this.filters['name'].value ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'C3', value: 'Apellido Paterno:', bold: true },
      { cell: 'D3', value: `${this.filters['sure_name'].value ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'C4', value: 'Apellido Materno:', bold: true },
      { cell: 'D4', value: `${this.filters['last_name'].value ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'C5', value: 'Ingreso (FI):', bold: true },
      { cell: 'D5', value: `${this.filters['entry_start_date'].value ? this.dateService.dateFormatted(this.filters['entry_start_date'].value) : 'Sin seleccionar'}`, bold: false },
      { cell: 'C6', value: 'Ingreso (FF):', bold: true },
      { cell: 'D6', value: `${this.filters['entry_end_date'].value ? this.dateService.dateFormatted(this.filters['entry_end_date'].value) : 'Sin seleccionar'}`, bold: false },
      { cell: 'C7', value: 'Género:', bold: true },
      { cell: 'D7', value: `${document.getElementById('gender')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'E3', value: 'SSP:', bold: true },
      { cell: 'F3', value: `${document.getElementById('ssp')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'E4', value: 'Nacimiento (FI):', bold: true },
      { cell: 'F4', value: `${this.filters['natal_start_date'].value ? this.dateService.dateFormatted(this.filters['natal_start_date'].value) : 'Sin seleccionar'}`, bold: false },
      { cell: 'E5', value: 'Nacimiento (FF):', bold: true },
      { cell: 'F5', value: `${this.filters['natal_end_date'].value ? this.dateService.dateFormatted(this.filters['natal_end_date'].value) : 'Sin seleccionar'}`, bold: false },
      { cell: 'E6', value: 'Estatus:', bold: true },
      { cell: 'F6', value: `${document.getElementById('status')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'E7', value: '¿Tiene Hijos?:', bold: true },
      { cell: 'F7', value: `${document.getElementById('has_children')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'G3', value: 'Acta de nacimiento', bold: true },
      { cell: 'H3', value: `${document.getElementById('has_birth_certificate')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'G4', value: 'Identificación Oficial', bold: true },
      { cell: 'H4', value: `${document.getElementById('has_identification')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'G5', value: 'CURP', bold: true },
      { cell: 'H5', value: `${document.getElementById('has_curp')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'G6', value: 'NSS', bold: true },
      { cell: 'H6', value: `${document.getElementById('has_nss')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'G7', value: 'Comprobante domiciliario', bold: true },
      { cell: 'H7', value: `${document.getElementById('has_address_certification')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'I3', value: 'Comprobante de estudios', bold: true },
      { cell: 'J3', value: `${document.getElementById('has_studies_certification')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'I4', value: 'Comprobante fiscal', bold: true },
      { cell: 'J4', value: `${document.getElementById('has_tax_certificate')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'I5', value: 'Cartilla militar', bold: true },
      { cell: 'J5', value: `${document.getElementById('has_smn')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'I6', value: 'Antecedentes penales', bold: true },
      { cell: 'J6', value: `${document.getElementById('has_no_criminal_certificate')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'I7', value: 'Certificado médico', bold: true },
      { cell: 'J7', value: `${document.getElementById('has_health_certificate')?.textContent ?? 'Sin seleccionar'}`, bold: false },
      { cell: 'K3', value: 'Seguro de vida', bold: true },
      { cell: 'L3', value: `${document.getElementById('has_sv')?.textContent ?? 'Sin seleccionar'}`, bold: false },
    ];

    const rows: Array<any> = [];
    this.entities.forEach((item, index) => {
      rows.push([
        index + 1,
        item.code,
        item.name,
        item.sure_name,
        item.last_name,
        item.natal_date_formatted,
        item.gender,
        item.has_children == true ? 'Sí' : 'No',
        item.shirt_size,
        item.pants_size,
        item.shoe_size,
        item.phone,
        item.email,
        item.address,
        item.cp,
        item.rfc,
        item.curp,
        item.nss,
        item.ssp == true ? 'Si' : 'No',
        item.entry_date_formatted,
        item.department.name,
        item.job.name,
        item.recruitment_method.name,
        item.antidoping?.result,
        item.antidoping?.comments,
        item.has_birth_certificate == true ? 'X' : '-',
        item.has_identification == true ? 'X' : '-',
        item.has_curp == true ? 'X' : '-',
        item.has_nss == true ? 'X' : '-',
        item.has_address_certification == true ? 'X' : '-',
        item.has_studies_certification == true ? 'X' : '-',
        item.has_tax_certificate == true ? 'X' : '-',
        item.has_smn == true ? 'X' : '-',
        item.has_no_criminal_certificate == true ? 'X' : '-',
        item.has_health_certificate == true ? 'X' : '-',
        item.has_sv == true ? 'X' : '-',
      ]);

    })

    this.reportService.generateXLSX(
      'Empleados',
      'A1:M1',
      'Empleados',
      filterCellsXLSX,
      this.columnCellsXLSX,
      'M2',
      'A10',
      this.tableColumnsXLSX,
      rows
    );
  }

  pdf() {

    let dataFilters = [
      [
        `${document.getElementById('id_department')?.textContent ?? 'Sin seleccionar'}`,
        `${document.getElementById('id_job')?.textContent ?? 'Sin seleccionar'}`,
        `${document.getElementById('id_recruitment_method')?.textContent ?? 'Sin seleccionar'}`,
        `${this.filters['code'].value ?? 'Sin seleccionar'}`,
        `${this.filters['name'].value ?? 'Sin seleccionar'}`,
        `${this.filters['sure_name'].value ?? 'Sin seleccionar'}`,
        `${this.filters['last_name'].value ?? 'Sin seleccionar'}`,
        `${this.filters['entry_start_date'].value ? this.dateService.dateFormatted(this.filters['entry_start_date'].value) : 'Sin seleccionar'}`,
        `${this.filters['entry_end_date'].value ? this.dateService.dateFormatted(this.filters['entry_end_date'].value) : 'Sin seleccionar'}`,
        `${document.getElementById('status')?.textContent ?? 'Sin seleccionar'}`,
        `${document.getElementById('gender')?.textContent ?? 'Sin seleccionar'}`,
        `${document.getElementById('ssp')?.textContent ?? 'Sin seleccionar'}`,
        `${document.getElementById('has_children')?.textContent ?? 'Sin seleccionar'}`,
        `${this.filters['natal_start_date'].value ? this.dateService.dateFormatted(this.filters['natal_start_date'].value) : 'Sin seleccionar'}`,
        `${this.filters['natal_end_date'].value ? this.dateService.dateFormatted(this.filters['natal_end_date'].value) : 'Sin seleccionar'}`
      ]
    ];


    let index = 1;

    let dataTable = this.entities.map(getDataTable);
    function getDataTable(datos: any) {
      return [
        index + 1,
        datos.code,
        datos.name,
        datos.sure_name,
        datos.last_name,
        datos.natal_date_formatted,
        datos.gender,
        datos.has_children ? 'Sí' : 'No',
        datos.shirt_size,
        datos.pants_size,
        datos.shoe_size,
        datos.phone,
        datos.email,
        datos.address,
        datos.cp,
        datos.rfc,
        datos.curp,
        datos.nss,
        datos.ssp ? 'Sí' : 'No',
        datos.entry_date_formatted,
        datos.department.name,
        datos.job.name,
        datos.recruitment_method.name,
        datos.antidoping?.result,
        datos.antidoping?.comments,
      ];
    }

    this.reportService.generatePDF('Empleados', 'Empleados', this.filterColumnsPDF, dataFilters, this.tableColumnsPDF, dataTable, 'l', true)
  }


}
