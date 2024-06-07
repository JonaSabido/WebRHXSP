import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { DropdownModule } from 'primeng/dropdown';
import { months } from '../../interfaces/calendar';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AnalyticService } from '../../core/services/analytic.service';
import { AnalyticResponse } from '../../interfaces/analytic';
import { Chart, registerables } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(ChartDataLabels, ...registerables);


@Component({
  selector: 'app-report-leave',
  standalone: true,
  imports: [BreadcrumbComponent, DropdownModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './report-leave.component.html',
  styleUrl: './report-leave.component.scss'
})
export class ReportLeaveComponent extends View implements OnInit {
  module = 'Movimientos de Baja'
  icon = 'pi-angle-double-down'
  prevLinks = ['Home', 'Reportes']
  activeLink = 'Movimientos de Baja'
  months = months
  select_month: number
  select_year: number
  message: string
  dataChart: AnalyticResponse[]
  chart: any = null;
  @ViewChild('chart') canvas: ElementRef = {} as ElementRef;

  constructor(
    private analyticService: AnalyticService
  ) {
    super()
    this.select_month = new Date().getMonth() + 1
    this.select_year = new Date().getFullYear()
    this.dataChart = []
    this.message = 'Seleccione sus filtros de busqueda'
  }

  ngOnInit(): void {

  }

  getData() {
    if (this.chart) {
      this.chart.destroy();
    }
    this.analyticService.getLeavesByMonth(this.select_month, this.select_year).subscribe({
      next: (response) => {
        this.dataChart = response.data
        this.generateChart()
      },

      error: (e) => {
        this.dataChart = []
        this.message = ' Sin resultados, intente con otros filtros...'
      }
    })
  }

  generateChart() {
    const myCanvas = this.canvas.nativeElement;
    this.chart = new Chart(myCanvas, {
      type: 'bar',
      data: {
        labels: this.dataChart.map(entity => `${entity.label} (${entity.percentage}%)`),
        datasets: [
          {
            label: 'TOTAL',
            data: this.dataChart.map(entity => entity.total),
            backgroundColor: [
              'rgb(20, 97, 158)',   // Azul mediano
              'rgb(59, 134, 180)',  // Azul claro
              'rgb(95, 158, 160)',  // Azul verdoso
              'rgb(132, 181, 139)', // Verde azulado claro
              'rgb(165, 202, 119)', // Verde lima
              'rgb(200, 223, 99)',  // Verde limón
              'rgb(235, 244, 79)'   // Naranja quemado
            ],
            borderColor: [
              'rgb(20, 97, 158)',   // Azul mediano
              'rgb(59, 134, 180)',  // Azul claro
              'rgb(95, 158, 160)',  // Azul verdoso
              'rgb(132, 181, 139)', // Verde azulado claro
              'rgb(165, 202, 119)', // Verde lima
              'rgb(200, 223, 99)',  // Verde limón
              'rgb(235, 244, 79)'  // Naranja quemado
            ],
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 20,
            bottom: 20,
            left: 20,
            right: 20
          }
        },
        plugins: {
          title: {
            display: false,
            text: 'Gráfico de Barras con Datos',
            font: {
              size: 22
            }
          },
          tooltip: {
            padding: 20,
            bodyFont: {
              size: 12
            },
            titleFont: {
              size: 14
            }
          },
          legend: {
            display: false,
            position: 'left',
            labels: {
              font: {
                size: 18
              },
              padding: 30
            },
          },
          datalabels: {
            display: true,
            color: 'white',
            font: {
              weight: 'bold',
              size: 18 // Tamaño de la letra de los labels debajo de las barras
            },
            formatter: (value, context) => {
              return value;
            }
          }
        },
        scales: {
          x: {
            ticks: {
              font: {
                size: 14 // Tamaño de la letra de los labels debajo de las barras
              }
            }
          }
        }
      }
    });
  }


}
