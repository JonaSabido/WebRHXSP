import { Component } from '@angular/core';
import { View } from '../../../../shared/helpers/view';
import { TagModule } from 'primeng/tag';
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component';
import { CardPaymentComponent } from '../../components/card-payment/card-payment.component';

@Component({
  selector: 'app-recommendation-payment',
  standalone: true,
  imports: [BreadcrumbComponent, CardPaymentComponent],
  templateUrl: './recommendation-payment.component.html',
  styleUrl: './recommendation-payment.component.scss'
})
export class RecommendationPaymentComponent extends View {
  module = 'Pagos'
  icon = 'pi-dollar'
  prevLinks = ['Home', 'Recomendaciones']
  activeLink = 'Pagos'
  data = [
    {
      employee: 'Juan Olmo',
      employee_recomendation: 'Maria Rodriguez',
      amount: 300,
      date: '18-04-2024',
      status: 'Próximo a pagar'

    },
    {
      employee: 'Maria Rodriguez',
      employee_recomendation: 'David Riquelme',
      amount: 300,
      date: '18-04-2024',
      status: 'Pagado'
    },
    {
      employee: 'Maria Rodriguez',
      employee_recomendation: 'Jorge Sanchez',
      amount: 300,
      date: '18-04-2024',
      status: 'Cancelado'
    },
    {
      employee: 'Luis Peraza',
      employee_recomendation: 'Jesus Rodriguez',
      amount: 300,
      date: '18-04-2024',
      status: 'Próximo a pagar'
    },
    {
      employee: 'Carlos Hernandez',
      employee_recomendation: 'Rodrigo Quintana',
      amount: 300,
      date: '18-02-2024',
      status: 'Pagado'
    }
  ]
}
