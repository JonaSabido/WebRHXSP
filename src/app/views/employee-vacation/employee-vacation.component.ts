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

@Component({
  selector: 'app-employee-vacation',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule],
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
  employees: EmployeeResponse[]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: EmployeeVacationService,
    public messageService: MessageService,
    private employeeService: EmployeeService
  ) {
    super(dialogService, refDialog, service, messageService)

    this.dialogConfig = {
      header: 'Nueva vacación',
      closeOnEscape: true,
      closable: true,
      width: '50%',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    }
    // this.selectedOption = 'id_employee'
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

  protected restoreFilters(){
    
  }

  ngOnInit(): void {
    this.employeeService.all().subscribe(response => this.employees = response.data)
  }


}
