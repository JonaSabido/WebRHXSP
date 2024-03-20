import { Component } from '@angular/core';
import { DiseaseDialogComponent } from '../../dialogs/disease-dialog/disease-dialog.component';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { Crud } from '../../../../shared/helpers/crud';

@Component({
  selector: 'app-disease',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService, DynamicDialogRef,],
  templateUrl: './disease.component.html',
  styleUrl: './disease.component.scss'
})
export class DiseaseComponent extends Crud {
  module = 'Enfermedades'
  icon = 'pi-heart'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Enfermedades'
  dialogConfig: DynamicDialogConfig;
  data = [
    {
      name: 'Ansiedad'
    },
    {
      name: 'Hipertensión'
    },
    {
      name: 'Diabetes'
    },
    {
      name: 'Alergia a la penicilina'
    },
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
  ) {
    super(dialogService, refDialog)
    this.dialogConfig = {
      header: 'Nueva enfermedad',
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
    return this.dialogService.open(DiseaseDialogComponent, this.dialogConfig)
  }

  protected restore(){
    
  }
}