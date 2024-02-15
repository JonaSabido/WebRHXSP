import { Component } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { EmergencyDialogComponent } from '../../dialogs/emergency-dialog/emergency-dialog.component';

@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService],
  templateUrl: './emergency.component.html',
  styleUrl: './emergency.component.scss'
})
export class EmergencyComponent extends View {
  ref: DynamicDialogRef | undefined;
  module = 'Números de emergencia'
  icon = 'pi-phone'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Números de emergencia'
  entities = [
    {
      employee: 'Juan Olmo',
      reference_name: 'Maria Chuc',
      type: 'Esposa',
      phone: '9993271826'
    },
    {
      employee: 'Maria Rodriguez',
      reference_name: 'Alba del Rosario',
      type: 'Cuñada',
      phone: '99990432678'
    },
    {
      employee: 'Maria Rodriguez',
      reference_name: 'Edwin Tutz',
      type: 'Esposo',
      phone: '9996216354'
    },
    {
      employee: 'Luis Martinez',
      reference_name: 'Eduardo Quintanilla',
      type: 'Hermano',
      phone: '9991728193'
    },
    {
      employee: 'Luis Martinez',
      reference_name: 'Joel Martin Perez',
      type: 'Esposa',
      phone: '9992124532'
    }
  ]

  constructor(
    public dialogService: DialogService
  ) {
    super()
  }

  show() {
    this.ref = this.dialogService.open(EmergencyDialogComponent,
      {
        header: 'Nuevo número de emergencia',
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