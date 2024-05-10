import { Component, ViewChild } from '@angular/core';
import { DialogCrud } from '../../../../shared/helpers/dialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { VacationTimeService } from '../../core/services/vacation-time.service';
import { VacationTimeResponse } from '../../interfaces/vacation-time';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-employee-vacation-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule, FormsModule, TagModule],
  templateUrl: './employee-vacation-dialog.component.html',
  styleUrl: './employee-vacation-dialog.component.scss'
})
export class EmployeeVacationDialogComponent extends DialogCrud {
  @ViewChild('form') form: NgForm = {} as NgForm;
  employees: EmployeeResponse[]
  vacationTimesByEmployee: VacationTimeResponse[]
  select_id_employee: number
  select_vacation_time: VacationTimeResponse
  severityByAvailableDays: 'info' | 'warning' | 'danger'

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private employeeService: EmployeeService,
    private vacationTimeService: VacationTimeService,

  ) {
    super(ref, config)
    this.employees = []
    this.vacationTimesByEmployee = []
    this.select_id_employee = 0
    this.select_vacation_time = this.vacationTimeRestore()
    this.severityByAvailableDays = 'info'
  }

  ngOnInit() {
    this.employeeService.all().subscribe(response => this.employees = response.data)
  }

  vacationTimeRestore(): VacationTimeResponse {
    return {
      id: 0,
      id_employee: 0,
      start_date: '',
      end_date: '',
      period: '',
      days: 0,
      available_days: 0,
      take_days: 0,
      createdAt: '',
      updatedAt: ''
    }
  }

  onChangeEmployee() {
    this.vacationTimeService.all([{ label: 'Empleado', property: 'id_employee', value: this.select_id_employee }]).subscribe({
      next: (response) => { this.vacationTimesByEmployee = response.data },
      error: (e) => { this.vacationTimesByEmployee = [] }
    }
    )
    this.config.data.entity.id_vacation_time = 0;
    this.onChangeVacationTime()
  }

  onChangeVacationTime() {
    this.select_vacation_time = this.vacationTimesByEmployee.find(x => x.id == this.config.data.entity.id_vacation_time) ?? this.vacationTimeRestore()

    if (this.select_vacation_time.available_days >= 6) {
      this.severityByAvailableDays = 'info'
    }
    else if (this.select_vacation_time.available_days <= 5 && this.select_vacation_time.available_days >= 1) {
      this.severityByAvailableDays = 'warning'
    }
    else {
      this.severityByAvailableDays = 'danger'
    }
  }

}
