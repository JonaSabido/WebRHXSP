import { Component } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AreaDialogComponent } from '../../dialogs/area-dialog/area-dialog.component';

@Component({
  selector: 'app-area',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule],
  providers: [DialogService],
  templateUrl: './area.component.html',
  styleUrl: './area.component.scss'
})
export class AreaComponent extends View {
  ref: DynamicDialogRef | undefined;
  module = 'Areas'
  icon = 'pi-home'
  prevLinks = ['Home', 'Empresa']
  activeLink = 'Areas'
  entities = [
    {
      name: 'Administrativo'
    },
    {
      name: 'Operativo'
    },
  ]

  constructor(
    public dialogService: DialogService
  ) {
    super()
  }

  show() {
    this.ref = this.dialogService.open(AreaDialogComponent,
      {
        header: 'Nueva area',
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
