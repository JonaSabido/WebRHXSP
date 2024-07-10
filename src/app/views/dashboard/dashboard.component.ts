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
import { AnalyticService } from '../../core/services/analytic.service';
import { EventMonth, TotalData } from '../../interfaces/analytic';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BreadcrumbComponent, TableModule, ButtonModule, RippleModule, TooltipModule, AreaDialogComponent, CommonModule, TagModule,],
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
  eventMonths: EventMonth[]
  totalData: TotalData

  constructor(
    public dialogService: DialogService,
    private analyticService: AnalyticService,
  ) {
    super()
    this.daysInMonth = []
    this.eventMonths = []
    this.totalData = {
      total_employees: 0,
      total_areas: 0,
      total_departments: 0,
      total_jobs: 0
    }
    this.titleCalendar = ''
  }

  ngOnInit() {
    this.analyticService.getTotalData().subscribe({
      next: (response) => this.totalData = response.data,
      error: (e) => {
        this.totalData = {
          total_employees: 0,
          total_areas: 0,
          total_departments: 0,
          total_jobs: 0
        }
      }
    })
    
    this.analyticService.getEventsByMonth().subscribe({
      next: (response) => {
        this.eventMonths = response.data
        this.generateCalendar()
      },
      error: (e) => {
        this.eventMonths = []
      }
    })
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
      days.push({ value: daysInPreviousMonth - i, currentMonth: false, isToday: false, selected: false, isBirthDay: false, isPayment: false, isContract: false });
    }

    // Insertar los números de los días del mes actual
    for (let i = 1; i <= lastDateOfMonth; i++) {
      const paddedMonth = (currentMonth + 1).toString().padStart(2, '0'); // Asegurar que el mes tenga dos dígitos
      const paddedDay = i.toString().padStart(2, '0'); // Asegurar que el día tenga dos dígitos
      const date = `${currentYear}-${paddedMonth}-${paddedDay}`;
      const isToday = i === today.getDate() && currentYear === today.getFullYear() && currentMonth === today.getMonth();
      days.push({ value: i, currentMonth: true, isToday, selected: false, isBirthDay: this.checkIsEvent(date, 1), isPayment: this.checkIsEvent(date, 2), isContract: this.checkIsEvent(date, 3) });
    }

    // Determinar el número de días del próximo mes
    const remainingDays = 7 - (days.length % 7);

    // Insertar los días del próximo mes que se muestran en la misma semana que el último día del mes actual
    for (let i = 1; i <= remainingDays; i++) {
      days.push({ value: i, currentMonth: false, isToday: false, selected: false, isBirthDay: false, isPayment: false, isContract: false });
    }

    this.daysInMonth = days;
    const monthName = this.currentDate.toLocaleString('es-ES', { month: 'long' }).toUpperCase();
    this.titleCalendar = `${monthName} ${currentYear}`;
  }

  checkIsEvent(date: string, type: number): boolean {
    return this.eventMonths.some(x => x.date == date && x.type == type)
  }

}
