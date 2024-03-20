import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Crud } from '../../../../shared/helpers/crud';
import { RecomendationDialogComponent } from '../../dialogs/recomendation-dialog/recomendation-dialog.component';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-recomendation',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule],
  providers: [DialogService, DynamicDialogRef],
  templateUrl: './recomendation.component.html',
  styleUrl: './recomendation.component.scss'
})
export class RecomendationComponent extends Crud {
  module = 'Registros'
  icon = 'pi-list'
  prevLinks = ['Home', 'Recomendaciones']
  activeLink = 'Registros'
  dialogConfig: DynamicDialogConfig;
  data = [
    {
      employee: 'Juan Olmo',
      employee_recomendation: 'Maria Rodriguez',
      amount: 300,
    },
    {
      employee: 'Maria Rodriguez',
      employee_recomendation: 'David Riquelme',
      amount: 300,
    },
    {
      employee: 'Maria Rodriguez',
      employee_recomendation: 'Jorge Sanchez',
      amount: 300,
    },
    {
      employee: 'Luis Peraza',
      employee_recomendation: 'Jesus Rodriguez',
      amount: 300,
    },
    {
      employee: 'Carlos Hernandez',
      employee_recomendation: 'Rodrigo Quintana',
      amount: 300,
    }
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
  ) {
    super(dialogService, refDialog)
    this.dialogConfig = {
      header: 'Nueva recomendación',
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
    return this.dialogService.open(RecomendationDialogComponent, this.dialogConfig)
  }

  protected restore(){
    
  }

}
