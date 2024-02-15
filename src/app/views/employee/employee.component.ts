import { Component } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { EmployeeDialogComponent } from '../../dialogs/employee-dialog/employee-dialog.component';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule],
  providers: [DialogService],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss'
})
export class EmployeeComponent extends View {
  ref: DynamicDialogRef | undefined;
  module = 'Registros'
  icon = 'pi-list'
  prevLinks = ['Home', 'Empleados']
  activeLink = 'Registros'
  entities = [
    {
      code: '1',
      fullname: 'Juan Olmo',
      area: 'Operativo',
      job: 'Guardia de Seguridad',
      department: 'IKA',
      entry_date: '10/12/2015',
      entry_month: 'Diciembre',
      entry_year: '2015',
      status: 'Alta'
    },
    {
      code: '2',
      fullname: 'Maria Rodriguez',
      area: 'Administrativo',
      job: 'EKOGOLF',
      department: 'XSP',
      entry_date: '01/05/2018',
      entry_month: 'Mayo',
      entry_year: '2018',
      status: 'Alta'
    },
    {
      code: '3',
      fullname: 'Luis Martinez',
      area: 'Operativo',
      job: 'Patrullero',
      department: 'YCC',
      entry_date: '03/10/2019',
      entry_month: 'Octubre',
      entry_year: '2019',
      status: 'Baja'
    },
    {
      code: '4',
      fullname: 'Ana Garcia',
      area: 'Operativo',
      job: 'Guardia de Seguridad',
      department: 'XSP',
      entry_date: '07/20/2016',
      entry_month: 'Julio',
      entry_year: '2016',
      status: 'Alta'
    },
    {
      code: '5',
      fullname: 'Pedro Lopez',
      area: 'Administrativo',
      job: 'EKOGOLF',
      department: 'IKA',
      entry_date: '09/14/2017',
      entry_month: 'Septiembre',
      entry_year: '2017',
      status: 'Baja'
    },
    {
      code: '6',
      fullname: 'Laura Fernandez',
      area: 'Operativo',
      job: 'Patrullero',
      department: 'YCC',
      entry_date: '11/30/2020',
      entry_month: 'Noviembre',
      entry_year: '2020',
      status: 'Alta'
    },
    {
      code: '7',
      fullname: 'Carlos Gomez',
      area: 'Operativo',
      job: 'Guardia de Seguridad',
      department: 'XSP',
      entry_date: '02/08/2018',
      entry_month: 'Febrero',
      entry_year: '2018',
      status: 'Alta'
    },
    {
      code: '8',
      fullname: 'Sofia Diaz',
      area: 'Administrativo',
      job: 'EKOGOLF',
      department: 'YCC',
      entry_date: '05/25/2019',
      entry_month: 'Mayo',
      entry_year: '2019',
      status: 'Baja'
    },
    {
      code: '9',
      fullname: 'Diego Torres',
      area: 'Operativo',
      job: 'Patrullero',
      department: 'IKA',
      entry_date: '12/18/2016',
      entry_month: 'Diciembre',
      entry_year: '2016',
      status: 'Alta'
    },
    {
      code: '10',
      fullname: 'Elena Ramirez',
      area: 'Administrativo',
      job: 'Guardia de Seguridad',
      department: 'YCC',
      entry_date: '04/07/2021',
      entry_month: 'Abril',
      entry_year: '2021',
      status: 'Alta'
    },
    {
      code: '11',
      fullname: 'Miguel Sánchez',
      area: 'Operativo',
      job: 'Guardia de Seguridad',
      department: 'XSP',
      entry_date: '06/29/2017',
      entry_month: 'Junio',
      entry_year: '2017',
      status: 'Baja'
    },
    {
      code: '12',
      fullname: 'Fernanda González',
      area: 'Administrativo',
      job: 'EKOGOLF',
      department: 'YCC',
      entry_date: '08/03/2022',
      entry_month: 'Agosto',
      entry_year: '2022',
      status: 'Alta'
    },
    {
      code: '13',
      fullname: 'Javier Aguilar',
      area: 'Operativo',
      job: 'Patrullero',
      department: 'IKA',
      entry_date: '10/11/2020',
      entry_month: 'Octubre',
      entry_year: '2020',
      status: 'Alta'
    },
    {
      code: '14',
      fullname: 'Susana Torres',
      area: 'Operativo',
      job: 'Guardia de Seguridad',
      department: 'XSP',
      entry_date: '12/09/2018',
      entry_month: 'Diciembre',
      entry_year: '2018',
      status: 'Alta'
    },
    {
      code: '15',
      fullname: 'Ricardo Herrera',
      area: 'Administrativo',
      job: 'EKOGOLF',
      department: 'YCC',
      entry_date: '02/14/2019',
      entry_month: 'Febrero',
      entry_year: '2019',
      status: 'Baja'
    }
  ]


  constructor(
    public dialogService: DialogService
  ) {
    super()
  }

  show() {
    this.ref = this.dialogService.open(EmployeeDialogComponent,
      {
        header: 'Nuevo empleado',
        closeOnEscape: false,
        closable: false,
        width: '90%',
        modal: true,
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
      });
  }
}
