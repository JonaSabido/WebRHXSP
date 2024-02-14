import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { View } from '../../../../shared/helpers/view';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AreaDialogComponent } from '../../dialogs/area-dialog/area-dialog.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, RippleModule, TooltipModule, AreaDialogComponent],
  providers: [DialogService],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends View {

  ref: DynamicDialogRef | undefined;
  module = 'Dashboard'
  icon = 'pi-home'
  prevLinks = ['Home']
  activeLink = 'Dashboard'
  products = [
    {
      name: 'El pepe',
      price: '65.00',
      category: 'Accesories',
      quantity: 50,
      status: 'Activo'
    },
    {
      name: 'Ascii',
      price: '60.00',
      category: 'Accesories',
      quantity: 50,
      status: 'Activo'
    }, {
      name: 'Simba',
      price: '65.00',
      category: 'Accesories',
      quantity: 50,
      status: 'Activo'
    }, {
      name: 'Leon',
      price: '65.00',
      category: 'Accesories',
      quantity: 50,
      status: 'Activo'
    }, {
      name: 'Bamboo Watch',
      price: '65.00',
      category: 'Accesories',
      quantity: 50,
      status: 'Activo'
    }, {
      name: 'Bamboo Watch',
      price: '65.00',
      category: 'Accesories',
      quantity: 50,
      status: 'Activo'
    }, {
      name: 'Bamboo Watch',
      price: '65.00',
      category: 'Accesories',
      quantity: 50,
      status: 'Activo'
    }, {
      name: 'Bamboo Watch',
      price: '65.00',
      category: 'Accesories',
      quantity: 50,
      status: 'Activo'
    }, {
      name: 'Bamboo Watch',
      price: '65.00',
      category: 'Accesories',
      quantity: 50,
      status: 'Activo'
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
        header: 'Select a Product',
        width: '50vw',
        modal: true,
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
      });
  }
}
