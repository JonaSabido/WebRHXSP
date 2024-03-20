import { Component } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AreaDialogComponent } from '../../dialogs/area-dialog/area-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService, DynamicDialogRef,],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent extends Crud {
  module = 'Areas'
  icon = 'pi-home'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Areas'
  dialogConfig: DynamicDialogConfig;
  data = [
    {
      name: 'Administrativo'
    },
    {
      name: 'Operativo'
    },
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
  ) {
    super(dialogService, refDialog)
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

  protected restore(){
    
  }
}
