import { Component, OnInit } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AreaDialogComponent } from '../../dialogs/area-dialog/area-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { AreaRequest, AreaResponse } from '../../interfaces/area';
import { AreaService } from '../../core/services/area.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, ToastModule],
  providers: [DialogService, DynamicDialogRef, MessageService],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent extends Crud<AreaRequest, AreaResponse> implements OnInit {
  module = 'Areas'
  icon = 'pi-home'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Areas'
  dialogConfig: DynamicDialogConfig;

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    public service: AreaService,
    public messageService: MessageService,
  ) {
    super(dialogService, refDialog, service, messageService)
    this.dialogConfig = {
      header: 'Nueva area',
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
    return this.dialogService.open(AreaDialogComponent, this.dialogConfig)
  }

  protected restore() {
    this.entity = {
      name: "",
    }
  }

  ngOnInit(): void {
  }
}
