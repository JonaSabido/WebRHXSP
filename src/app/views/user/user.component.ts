import { Component, OnInit } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserDialogComponent } from '../../dialogs/user-dialog/user-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { UserQueryFilter, UserRequest, UserResponse } from '../../interfaces/user';
import { UserService } from '../../core/services/user.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, ToastModule, DropdownModule, InputTextModule, FormsModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent extends Crud<UserRequest, UserResponse, UserQueryFilter> implements OnInit {
  module = 'Usuarios'
  icon = 'pi-users'
  prevLinks = ['Home', 'Sistema']
  activeLink = 'Usuarios'
  dialogConfig: DynamicDialogConfig;
  defaultHeader: string = 'Nuevo Usuario';

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: UserService,
    public messageService: MessageService,
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
    this.selectedOption = 'name'
  }

  protected getRefDialog() {
    return this.dialogService.open(UserDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      name: "",
      email: "",
      password: ""
    }
  }

  protected restoreFilters() {
    this.filters = {
      name: {
        property: 'name',
        label: 'Nombre',
        value: ''
      },
      email: {
        property: 'email',
        label: 'Correo',
        value: ''
      },
    }
  }

  ngOnInit(): void {
  }
}
