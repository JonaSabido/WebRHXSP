import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EmployeeDialogComponent } from '../../dialogs/employee-dialog/employee-dialog.component';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';
import { Crud } from '../../../../shared/helpers/crud';
import { EmployeeRequest, EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, ToastModule, AvatarModule, BadgeModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent extends Crud<EmployeeRequest, EmployeeResponse> implements OnInit {
  module = 'Registros'
  icon = 'pi-list'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Registros'
  dialogConfig: DynamicDialogConfig;

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: EmployeeService,
    public messageService: MessageService,
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nuevo empleado',
      closeOnEscape: true,
      closable: true,
      width: '90%',
      modal: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw'
      },
    }
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
      ssp: true,
      natal_date: "",
      email: "",
      phone: "",
      shirt_size: "",
      pants_size: "",
      shoe_size: "",
      has_children: true,
      address: "",
      cp: "",
      comments: "",
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

  }

  ngOnInit(): void {
  }
}
