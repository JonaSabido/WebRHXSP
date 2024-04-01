import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { View } from '../../../../shared/helpers/view';
import { CalendarDay } from '../../interfaces/calendar-day';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-vacation-chart',
  standalone: true,
  imports: [BreadcrumbComponent, CommonModule],
  templateUrl: './employee-vacation-chart.component.html',
  styleUrl: './employee-vacation-chart.component.scss'
})
export class EmployeeVacationChartComponent extends View implements OnInit {
  module = 'Estadistica'
  icon = 'pi-list'
  prevLinks = ['Home', 'Vacaciones']
  activeLink = 'Estadistica'
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  currentDate: Date = new Date();
  daysInMonth: CalendarDay[] = [];

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar() {
    const today = new Date();
    const currentYear = this.currentDate.getFullYear();
    const currentMonth = this.currentDate.getMonth();

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
      days.push({ value: daysInPreviousMonth - i, currentMonth: false, isToday: false });
    }

    // Insertar los números de los días del mes actual
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday = i === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth();
      days.push({ value: i, currentMonth: true, isToday });
    }

    // Determinar el número de días del próximo mes
    const remainingDays = 7 - (days.length % 7);

    // Insertar los días del próximo mes que se muestran en la misma semana que el último día del mes actual
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ value: i, currentMonth: false, isToday: false });
    }

    this.daysInMonth = days;
  }
}
