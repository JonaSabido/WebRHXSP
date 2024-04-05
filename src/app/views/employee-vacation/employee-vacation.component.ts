import { Component } from '@angular/core';
import { Crud } from '../../../../shared/helpers/crud';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeVacationDialogComponent } from '../../dialogs/employee-vacation-dialog/employee-vacation-dialog.component';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-employee-vacation',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule],
  providers: [DialogService, DynamicDialogRef],
  templateUrl: './employee-vacation.component.html',
  styleUrl: './employee-vacation.component.scss'
})
export class EmployeeVacationComponent extends Crud {
  module = 'Vacaciones'
  icon = 'pi-list'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Vacaciones'
  dialogConfig: DynamicDialogConfig;
  data = [
    {
      employee: 'Juan Olmo',
      start_date: '24 Febrero 2024',
      end_date: '28 Febrero 2024',
      period: '2024-2025'
    },
    {
      employee: 'Maria Rodriguez',
      start_date: '14 Febrero 2024',
      end_date: '18 Febrero 2024',
      period: '2024-2025'

    },
    {
      employee: 'Maria Rodriguez',
      start_date: '04 Enero 2022',
      end_date: '18 Enero 2022',
      period: '2022-2023'
    },
    {
      employee: 'Luis Martinez',
      start_date: '30 Marzo 2022',
      end_date: '05 Abril 2022',
      period: '2022-2023'
    },
    {
      employee: 'Luis Martinez',
      start_date: '31 Agosto 2020',
      end_date: '08 Septiembre 2020',
      period: '2020-2021'
    }
  ]

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
  ) {
    super(dialogService, refDialog)
    this.dialogConfig = {
      header: 'Nueva vacación',
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
    return this.dialogService.open(EmployeeVacationDialogComponent, this.dialogConfig)
  }

  protected restore(){
    
  }

  protected restoreFilters(){
    
  }

}
