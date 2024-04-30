import { Component } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { View } from '../../../../shared/helpers/view';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AbsenceChartDialogComponent } from '../../dialogs/absence-chart-dialog/absence-chart-dialog.component';
import { TagModule } from 'primeng/tag';
import { AbsenceService } from '../../core/services/absence.service';
import { AbsenceChartResponse, AbsenceQueryFilter } from '../../interfaces/absence';
import { ObjectFilter } from '../../../../shared/interfaces/object-filter';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { EmployeeResponse } from '../../interfaces/employee';
import { TypeAbsenceResponse } from '../../interfaces/type-absence';
import { JobResponse } from '../../interfaces/job';
import { EmployeeService } from '../../core/services/employee.service';
import { TypeAbsenceService } from '../../core/services/type-absence.service';
import { JobService } from '../../core/services/job.service';

@Component({
  selector: 'app-absence-chart',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, TooltipModule, TagModule, FormsModule, DropdownModule, CalendarModule],
  providers: [DialogService, DynamicDialogRef],
  templateUrl: './absence-chart.component.html',
  styleUrl: './absence-chart.component.scss'
})
export class AbsenceChartComponent extends View {
  module = 'Estadistica'
  icon = 'pi-chart-bar'
  prevLinks = ['Home', 'Faltas']
  activeLink = 'Estadistica'
  data: AbsenceChartResponse[]
  employees: EmployeeResponse[]
  typeAbsences: TypeAbsenceResponse[]

  filterOptions: ObjectFilter<AbsenceQueryFilter>[] | any;
  filters: AbsenceQueryFilter | any
  selectedOption: keyof AbsenceQueryFilter | undefined;
  message: string

  constructor(
    public dialogService: DialogService,
    public refDialog: DynamicDialogRef,
    private service: AbsenceService,
    private employeeService: EmployeeService,
    private typeAbsenceService: TypeAbsenceService,
  ) {
    super()
    this.data = []
    this.filterOptions = []
    this.restoreFilters()
    this.generateFilterOptions();
    this.selectedOption = 'start_date'
    this.employees = []
    this.typeAbsences = []
    this.message = 'Seleccione sus filtros de busqueda'
  }

  protected restoreFilters() {
    this.filters = {
      start_date: {
        property: 'start_date',
        label: 'Fecha Inicio',
        value: ''
      },
      end_date: {
        property: 'end_date',
        label: 'Fecha Final',
        value: ''
      },
      id_employee: {
        property: 'id_employee',
        label: 'Empleado',
        value: null
      },
      // id_type_absence: {
      //   property: 'id_type_absence',
      //   label: 'Tipo de falta',
      //   value: null
      // },
      // year: {
      //   property: 'year',
      //   label: 'Año',
      //   value: null
      // },

    }
  }

  protected generateFilterOptions(): void {
    for (let key in this.filters) {
      this.filterOptions.push(this.filters[key] as ObjectFilter<AbsenceQueryFilter>)
    }
  }

  openDialog(entity: AbsenceChartResponse) {
    const data = { ...entity, start_date: this.filters['start_date'].value, end_date: this.filters['end_date'].value }
    this.refDialog = this.dialogService.open(AbsenceChartDialogComponent,
      {
        header: 'Desglose de faltas',
        closeOnEscape: true,
        closable: true,
        data: data,
        width: '50%',
        modal: true,
        breakpoints: {
          '960px': '75vw',
          '640px': '90vw'
        },
      }
    )
  }

  ngOnInit(): void {
    this.employeeService.all().subscribe(response => this.employees = response.data)
    this.typeAbsenceService.all().subscribe(response => this.typeAbsences = response.data)
  }

  getData() {
    this.service.getGroup(this.filterOptions).subscribe(
      {
        next: (response) => this.data = response.data,
        error: (e) => {
          this.data = []
          this.message = ' Sin resultados, intente con otros filtros...'
        }
      }
    )
  }

}
