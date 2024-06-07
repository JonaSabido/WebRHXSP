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
  selector: 'app-report-recruitment-method',
  standalone: true,
  imports: [BreadcrumbComponent, DropdownModule, FormsModule, ButtonModule, InputTextModule],
  templateUrl: './report-recruitment-method.component.html',
  styleUrl: './report-recruitment-method.component.scss'
})
export class ReportRecruitmentMethodComponent extends View implements OnInit {
  module = 'Métodos de Reclutamiento'
  icon = 'pi-share-alt'
  prevLinks = ['Home', 'Reportes']
  activeLink = 'Métodos de Reclutamiento'
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
    this.analyticService.getRecruitmentsByMonth(this.select_month, this.select_year).subscribe({
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
      type: 'pie',
      data: {
        labels: this.dataChart.map(entity => `${entity.label} (${entity.percentage}%)`),
        datasets: [
          {
            label: 'TOTAL',
            data: this.dataChart.map(entity => entity.total),
            backgroundColor: [
              'rgb(20, 35, 138)',  // Azul bajo
              'rgb(0, 77, 64)',    // Verde azulado oscuro
              'rgb(56, 142, 142)', // Azul cobalto oscuro
              'rgb(27, 94, 32)',   // Verde oscuro
              'rgb(69, 39, 160)',  // Púrpura oscuro
              'rgb(62, 39, 35)',   // Marrón oscuro
              'rgb(191, 54, 12)'   // Naranja quemado
            ],
            borderColor: [
              'rgb(20, 35, 138)',  // Azul bajo
              'rgb(0, 77, 64)',    // Verde azulado oscuro
              'rgb(56, 142, 142)', // Azul cobalto oscuro
              'rgb(27, 94, 32)',   // Verde oscuro
              'rgb(69, 39, 160)',  // Púrpura oscuro
              'rgb(62, 39, 35)',   // Marrón oscuro
              'rgb(191, 54, 12)'   // Naranja quemado
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
            text: 'Gráfico de Pie con Datos',
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
            display: true,
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
              size: 18
            },
            formatter: (value, context) => {
              return value;
            }
          }
        }
      }
    });
  }


}
