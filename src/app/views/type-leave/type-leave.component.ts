import { Component, OnInit } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TypeLeaveDialogComponent } from '../../dialogs/type-leave-dialog/type-leave-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { TypeLeaveQueryFilter, TypeLeaveRequest, TypeLeaveResponse } from '../../interfaces/type-leave';
import { TypeLeaveService } from '../../core/services/type-leave.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-type-leave',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, ToastModule, DropdownModule, InputTextModule, FormsModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './type-leave.component.html',
  styleUrl: './type-leave.component.scss'
})
export class TypeLeaveComponent extends Crud<TypeLeaveRequest, TypeLeaveResponse, TypeLeaveQueryFilter> implements OnInit {
  module = 'Tipos de bajas'
  icon = 'pi-angle-double-down'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Tipos de bajas'
  dialogConfig: DynamicDialogConfig;
  defaultHeader: string = 'Nuevo Tipo de Baja';

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: TypeLeaveService,
    public messageService: MessageService,
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nuevo tipo de baja',
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
    return this.dialogService.open(TypeLeaveDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      name: "",
    }
  }

  protected restoreFilters() {
    this.filters = {
      name: {
        property: 'name',
        label: 'Nombre',
        value: ''
      },
    }
  }

  ngOnInit(): void {
  }

}
