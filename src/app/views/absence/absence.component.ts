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

@Component({
  selector: 'app-absence',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, FormsModule, DropdownModule, CalendarModule],
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
  employees: EmployeeResponse[]
  typeAbsences: TypeAbsenceResponse[]
  jobs: JobResponse[]


  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: AbsenceService,
    public messageService: MessageService,
    private employeeService: EmployeeService,
    private typeAbsenceService: TypeAbsenceService,
    private jobService: JobService
  ) {
    super(dialogService, refDialog, service, messageService)

    this.dialogConfig = {
      header: 'Nueva falta',
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
}
