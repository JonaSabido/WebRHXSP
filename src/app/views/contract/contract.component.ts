import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ContractDialogComponent } from '../../dialogs/contract-dialog/contract-dialog.component';
import { Crud } from '../../../../shared/helpers/crud';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-contract',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule],
  providers: [DialogService, DynamicDialogRef],
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.scss'
})
export class ContractComponent extends Crud {
  module = 'Contratos'
  icon = 'pi-book'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Contratos'
  dialogConfig: DynamicDialogConfig;
  data = [
    {
      employee: 'Juan Olmo',
      start_date: '24 Febrero 2024',
      end_date: '30 Diciembre 2024',
      status: 'Vigente'
    },
    {
      employee: 'Maria Rodriguez',
      start_date: '14 Febrero 2023',
      end_date: '30 Abril 2023',
      status: 'Finalizado'
    },
    {
      employee: 'Maria Rodriguez',
      start_date: '04 Enero 2024',
      end_date: '30 Diciembre 2024',
      status: 'Vigente'
    },
    {
      employee: 'Luis Martinez',
      start_date: '30 Marzo 2022',
      end_date: '30 Junio 2022',
      status: 'Finalizado'
    },
    {
      employee: 'Luis Martinez',
      start_date: '31 Agosto 2020',
      end_date: '30 Septiembre 2023',
      status: 'Vigente'
    }
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
  ) {
    super(dialogService, refDialog)
    this.dialogConfig = {
      header: 'Nuevo contrato',
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
    return this.dialogService.open(ContractDialogComponent, this.dialogConfig)
  }

  protected restore() {

  }
}
