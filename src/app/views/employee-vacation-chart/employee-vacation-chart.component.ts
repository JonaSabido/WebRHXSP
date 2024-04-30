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
  calendarMonths: CalendarMonth[] = [
    {
      year: 2024,
      month: 1,
      startDate: new Date(2024, 1, 0),
      daysInMonth: [],
      textDisplay: ''
    },
    {
      year: 2024,
      month: 2,
      startDate: new Date(2024, 2, 0),
      daysInMonth: [],
      textDisplay: ''
    },
    {
      year: 2024,
      month: 3,
      startDate: new Date(2024, 3, 0),
      daysInMonth: [],
      textDisplay: ''
    },
    {
      year: 2024,
      month: 4,
      startDate: new Date(2024, 4, 0),
      daysInMonth: [],
      textDisplay: ''
    },
    {
      year: 2024,
      month: 5,
      startDate: new Date(2024, 5, 0),
      daysInMonth: [],
      textDisplay: ''
    },
    {
      year: 2024,
      month: 6,
      startDate: new Date(2024, 6, 0),
      daysInMonth: [],
      textDisplay: ''
    },
    {
      year: 2024,
      month: 7,
      startDate: new Date(2024, 7, 0),
      daysInMonth: [],
      textDisplay: ''
    },
    {
      year: 2024,
      month: 8,
      startDate: new Date(2024, 8, 0),
      daysInMonth: [],
      textDisplay: ''
    },
    {
      year: 2024,
      month: 9,
      startDate: new Date(2024, 9, 0),
      daysInMonth: [],
      textDisplay: ''
    },
    {
      year: 2024,
      month: 10,
      startDate: new Date(2024, 10, 0),
      daysInMonth: [],
      textDisplay: ''
    },
    {
      year: 2024,
      month: 11,
      startDate: new Date(2024, 11, 0),
      daysInMonth: [],
      textDisplay: ''
    },
    {
      year: 2024,
      month: 12,
      startDate: new Date(2024, 12, 0),
      daysInMonth: [],
      textDisplay: ''
    },
  ]
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
  selectedDates = ['2024-03-25', '2024-03-26', '2024-04-30', '2024-05-01', '2024-08-21', '2024-10-15', '2024-10-15', '2024-10-16', '2024-10-17', '2024-10-18', '2024-10-19',]

  constructor(
    private employeeService: EmployeeService
  ) {
    super()
    this.employees = []
  }


  ngOnInit(): void {
    this.employeeService.all().subscribe(response => this.employees = response.data)
    this.generateCalendar();
  }

  generateCalendar() {
    // const today = new Date();
    // const currentYear = this.currentDate.getFullYear();
    // const currentMonth = this.currentDate.getMonth();

    // const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    // const firstDayOfWeek = firstDayOfMonth.getDay(); // 0: Sunday, 1: Monday, ..., 6: Saturday

    // const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    // const lastDateOfMonth = lastDayOfMonth.getDate();

    // const days: CalendarDay[] = [];

    // // Determinar el número de días del mes anterior
    // const lastDayOfPreviousMonth = new Date(currentYear, currentMonth, 0);
    // const daysInPreviousMonth = lastDayOfPreviousMonth.getDate();

    // // Insertar los días del mes anterior que se muestran en la misma semana que el primer día del mes actual
    // for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    //   days.push({ value: daysInPreviousMonth - i, currentMonth: false, isToday: false });
    // }

    // // Insertar los números de los días del mes actual
    // for (let i = 1; i <= lastDateOfMonth; i++) {
    //   const isToday = i === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth();
    //   days.push({ value: i, currentMonth: true, isToday });
    // }

    // // Determinar el número de días del próximo mes
    // const remainingDays = 7 - (days.length % 7);

    // // Insertar los días del próximo mes que se muestran en la misma semana que el último día del mes actual
    // for (let i = 1; i <= remainingDays; i++) {
    //   days.push({ value: i, currentMonth: false, isToday: false });
    // }

    // this.daysInMonth = days;
  }

  generateCalendars() {
    this.dataGenerated = false;

    this.calendarMonths.forEach(element => {
      const today = new Date();
      const currentYear = element.startDate.getFullYear();
      const currentMonth = element.startDate.getMonth();

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
        days.push({ value: daysInPreviousMonth - i, currentMonth: false, isToday: false, selected: false });
      }

      // Insertar los números de los días del mes actual
      for (let i = 1; i <= lastDateOfMonth; i++) {
        const isToday = i === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth();
        const currentDate = new Date(currentYear, currentMonth, i).toISOString().split('T')[0]
        const isSelected = this.selectedDates.find(x => currentDate === x) ? true : false
        days.push({ value: i, currentMonth: true, isToday, selected: isSelected });
      }

      // Determinar el número de días del próximo mes
      const remainingDays = 7 - (days.length % 7);

      // Insertar los días del próximo mes que se muestran en la misma semana que el último día del mes actual
      for (let i = 1; i <= remainingDays; i++) {
        days.push({ value: i, currentMonth: false, isToday: false, selected: false });
      }

      element.daysInMonth = days;
      const monthName = element.startDate.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
      element.textDisplay = `${monthName} ${currentYear}`;
    });
    this.dataGenerated = true;
  }


}
