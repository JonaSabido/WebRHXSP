import { Component, OnInit, Type } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeReentryDialogComponent } from '../../dialogs/employee-reentry-dialog/employee-reentry-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { TagModule } from 'primeng/tag';
import { EmployeeReentryRequest, EmployeeReentryResponse } from '../../interfaces/employee-reentry';
import { EmployeeReentryService } from '../../core/services/employee-reentry.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';


@Component({
  selector: 'app-employee-reentry',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './employee-reentry.component.html',
  styleUrl: './employee-reentry.component.scss'
})
export class EmployeeReentryComponent extends Crud<EmployeeReentryRequest, EmployeeReentryResponse> implements OnInit {
  module = 'Reingresos'
  icon = 'pi-angle-double-up'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Reingresos'
  dialogConfig: DynamicDialogConfig;

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: EmployeeReentryService,
    public messageService: MessageService,
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nuevo reingreso',
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
    return this.dialogService.open(EmployeeReentryDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      id_employee: 0,
      reentry_date: '',
      description: ''
    }
  }

  protected restoreFilters(){
    
  }

  ngOnInit(): void {

  }

}
