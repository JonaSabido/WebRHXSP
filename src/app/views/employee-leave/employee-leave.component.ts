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
import { EmployeeLeaveRequest, EmployeeLeaveResponse } from '../../interfaces/employee-leave';
import { EmployeeLeaveService } from '../../core/services/employee-leave.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-employee-leave',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './employee-leave.component.html',
  styleUrl: './employee-leave.component.scss'
})
export class EmployeeLeaveComponent extends Crud<EmployeeLeaveRequest, EmployeeLeaveResponse> implements OnInit {
  module = 'Bajas'
  icon = 'pi-angle-double-down'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Bajas'
  dialogConfig: DynamicDialogConfig;

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: EmployeeLeaveService,
    public messageService: MessageService,
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nueva baja',
      closeOnEscape: false,
      closable: false,
      width: '50%',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    }
  }

  protected getRefDialog() {
    return this.dialogService.open(EmployeeLeaveDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      leave_date: '',
      description: ''
    }
  }

  ngOnInit(): void {

  }
  
}
