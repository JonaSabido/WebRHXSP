import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { View } from '../../../../shared/helpers/view';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AreaDialogComponent } from '../../dialogs/area-dialog/area-dialog.component';
import { CalendarDay, CalendarMonth, DaysOfWeek } from '../../interfaces/calendar';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, RippleModule, TooltipModule, AreaDialogComponent, CommonModule, TagModule, ],
  providers: [DialogService, DynamicDialogRef,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent extends View {

  ref: DynamicDialogRef | undefined;
  module = 'Dashboard'
  icon = 'pi-home'
  prevLinks = ['Home']
  activeLink = 'Dashboard'
  currentDate: Date = new Date();
  daysInMonth: CalendarDay[]
  daysOfWeek = DaysOfWeek
  titleCalendar: string

  constructor(
    public dialogService: DialogService
  ) {
    super()
    this.daysInMonth = []
    this.titleCalendar = ''
  }

  ngOnInit() {
    this.generateCalendar()
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
      days.push({ value: daysInPreviousMonth - i, currentMonth: false, isToday: false, selected: false });
    }

    // Insertar los números de los días del mes actual
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const isToday = i === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth();
      days.push({ value: i, currentMonth: true, isToday, selected: false });
    }

    // Determinar el número de días del próximo mes
    const remainingDays = 7 - (days.length % 7);

    // Insertar los días del próximo mes que se muestran en la misma semana que el último día del mes actual
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ value: i, currentMonth: false, isToday: false, selected: false });
    }

    this.daysInMonth = days;
    const monthName = this.currentDate.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
    this.titleCalendar = `${monthName} ${currentYear}`;
  }

}
