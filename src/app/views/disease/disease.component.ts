import { Component } from '@angular/core';
import { DiseaseDialogComponent } from '../../dialogs/disease-dialog/disease-dialog.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-disease',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService],
  templateUrl: './disease.component.html',
  styleUrl: './disease.component.scss'
})
export class DiseaseComponent extends View {
  ref: DynamicDialogRef | undefined;
  module = 'Enfermedades'
  icon = 'pi-heart'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Enfermedades'
  entities = [
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
    public dialogService: DialogService
  ) {
    super()
  }

  show() {
    this.ref = this.dialogService.open(DiseaseDialogComponent,
      {
        header: 'Nueva enfermedad',
        closeOnEscape: false,
        closable: false,
        width: '50%',
        modal: true,
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
      });
  }
}