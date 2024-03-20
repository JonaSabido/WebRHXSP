import { Component } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TypeAbsenceDialogComponent } from '../../dialogs/type-absence-dialog/type-absence-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';

@Component({
  selector: 'app-type-absence',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService, DynamicDialogRef,],
  templateUrl: './type-absence.component.html',
  styleUrl: './type-absence.component.scss'
})
export class TypeAbsenceComponent extends Crud {
  module = 'Tipos de faltas'
  icon = 'pi-stopwatch'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Tipos de faltas'
  dialogConfig: DynamicDialogConfig;
  data = [
    {
      name: 'Permiso sin goze de sueldo',
    },
    {
      name: 'Permiso con goze de sueldo'
    },
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
  ) {
    super(dialogService, refDialog)
    this.dialogConfig = {
      header: 'Nuevo tipo de falta',
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
    return this.dialogService.open(TypeAbsenceDialogComponent, this.dialogConfig)
  }

  protected restore(){
    
  }

}
