import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { View } from '../../../../shared/helpers/view';
import { CalendarDay, CalendarMonth, DaysOfWeek } from '../../interfaces/calendar';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { TagModule } from 'primeng/tag';
import { VacationTimeResponse } from '../../interfaces/vacation-time';
import { VacationTimeService } from '../../core/services/vacation-time.service';
import { EmployeeVacationService } from '../../core/services/employee-vacation.service';
import { EmployeeVacationChart } from '../../interfaces/employee-vacation';

@Component({
  selector: 'app-employee-vacation-chart',
  standalone: true,
  imports: [BreadcrumbComponent, CommonModule, CalendarModule, DropdownModule, FormsModule, TagModule],
  templateUrl: './employee-vacation-chart.component.html',
  styleUrl: './employee-vacation-chart.component.scss'
})
export class EmployeeVacationChartComponent extends View implements OnInit {
  module = 'Estadistica'
  icon = 'pi-list'
  prevLinks = ['Home', 'Vacaciones']
  activeLink = 'Estadistica'
  daysOfWeek = DaysOfWeek
  currentDate: Date = new Date();
  yearSelected: number = 2024
  periodValue: number = 1
  dataGenerated: boolean = false
  employeeId: number = 0
  calendarMonths: CalendarMonth[] = []
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numMonths: 1
    },
    {
      breakpoint: '768px',
      numMonths: 2
    },
    {
      breakpoint: '560px',
      numMonths: 1
    }
  ];
  employees: EmployeeResponse[]
  vacationTimesByEmployee: VacationTimeResponse[]
  select_id_employee: number
  select_id_vacation_time: number
  select_vacation_time: VacationTimeResponse
  severityByAvailableDays: 'info' | 'warning' | 'danger'
  selectedDates = ['2024-03-25', '2024-03-26', '2024-04-30', '2024-05-01', '2024-08-21', '2024-10-15', '2024-10-15', '2024-10-16', '2024-10-17', '2024-10-18', '2024-10-19',]

  constructor(
    private employeeService: EmployeeService,
    private vacationTimeService: VacationTimeService,
    private employeeVacationService: EmployeeVacationService,

  ) {
    super()
    this.employees = []
    this.vacationTimesByEmployee = []
    this.select_id_employee = 0
    this.select_id_vacation_time = 0
    this.select_vacation_time = this.vacationTimeRestore()
    this.severityByAvailableDays = 'info'
  }


  ngOnInit(): void {
    this.employeeService.all().subscribe(response => this.employees = response.data)
  }

  generateCalendars(employeeVacationCharts: EmployeeVacationChart[]) {
    this.dataGenerated = false;

    // Reset the calendarMonths array
    this.calendarMonths = [];

    // Iterar sobre cada EmployeeVacationChart
    employeeVacationCharts.forEach(chart => {
      const currentYear = chart.year;
      const currentMonth = chart.month - 1; // Ajuste porque los meses en Date son 0-indexados

      const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
      const firstDayOfWeek = firstDayOfMonth.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

      const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
      const lastDateOfMonth = lastDayOfMonth.getDate();

      const days: CalendarDay[] = [];

      // Determinar el número de días del mes anterior
      const lastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0);
      const daysInPreviousMonth = lastDayOfPreviousMonth.getDate();

      // Insertar los días del mes anterior que se muestran en la misma semana que el primer día del mes actual
      for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        days.push({ value: daysInPreviousMonth - i, currentMonth: false, isToday: false, selected: false, isBirthDay: false, isPayment: false, isContract: false });
      }

      // Insertar los números de los días del mes actual
      for (let i = 1; i <= lastDateOfMonth; i++) {
        const today = new Date();
        const isToday = i === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth();
        const currentDate = new Date(currentYear, currentMonth, i).toISOString().split('T')[0];
        const isSelected = chart.dates.includes(currentDate);
        days.push({ value: i, currentMonth: true, isToday, selected: isSelected, isBirthDay: false, isPayment: false, isContract: false });
      }

      // Determinar el número de días del próximo mes
      const remainingDays = 7 - (days.length % 7);

      // Insertar los días del próximo mes que se muestran en la misma semana que el último día del mes actual
      for (let i = 1; i <= remainingDays; i++) {
        days.push({ value: i, currentMonth: false, isToday: false, selected: false, isBirthDay: false, isPayment: false, isContract: false });
      }

      const monthName = firstDayOfMonth.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
      const calendarMonth: CalendarMonth = {
        year: currentYear,
        month: currentMonth + 1, // Ajuste porque los meses en Date son 0-indexados
        startDate: firstDayOfMonth,
        daysInMonth: days,
        textDisplay: `${monthName} ${currentYear}`
      };

      this.calendarMonths.push(calendarMonth);
    });

    this.dataGenerated = true;
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
    this.select_id_vacation_time = 0;
    this.onChangeVacationTime()
  }

  onChangeVacationTime() {
    this.select_vacation_time = this.vacationTimesByEmployee.find(x => x.id == this.select_id_vacation_time) ?? this.vacationTimeRestore()

    if (this.select_vacation_time.available_days >= 6) {
      this.severityByAvailableDays = 'info'
    }
    else if (this.select_vacation_time.available_days <= 5 && this.select_vacation_time.available_days >= 1) {
      this.severityByAvailableDays = 'warning'
    }
    else {
      this.severityByAvailableDays = 'danger'
    }

    if (this.select_id_vacation_time > 0) {
      this.employeeVacationService.getGroupedByMonth(this.select_id_vacation_time).subscribe({
        next: (response) => { this.generateCalendars(response.data) },
        error: (e) => { this.vacationTimesByEmployee = [], this.calendarMonths = [] }
      }
      )
    }

  }


}
