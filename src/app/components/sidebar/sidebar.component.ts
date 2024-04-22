import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { SidebarModuleItem } from '../../interfaces/sidebar';
import { RouterModule } from '@angular/router';
import { SidebarService } from '../../../../shared/helpers/services/sidebar.service';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, AvatarModule, RippleModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  @Input() isMobile: boolean = false;

  sidebarModuleItems: SidebarModuleItem[] = [
    {
      title: 'EMPLEADOS',
      visible: true,
      subitems: [
        {
          icon: 'list',
          title: 'Registros',
          path: 'empleados',
          isActive: false
        },
        {
          icon: 'angle-double-up',
          title: 'Reingresos',
          path: 'reingresos',
          isActive: false
        },
        {
          icon: 'angle-double-down',
          title: 'Bajas',
          path: 'bajas',
          isActive: false
        },
        {
          icon: 'heart',
          title: 'Enfermedades',
          path: 'empleadosenfermedades',
          isActive: false
        },
        {
          icon: 'phone',
          title: 'Números de emergencia',
          path: 'emergencias',
          isActive: false
        },
        {
          icon: 'book',
          title: 'Contratos',
          path: 'contratos',
          isActive: false
        },
        {
          icon: 'ticket',
          title: 'Antidopings',
          path: 'antidopings',
          isActive: false
        },
        {
          icon: 'tablet',
          title: 'Capacitaciones',
          path: 'capacitaciones',
          isActive: false
        },
        {
          icon: 'clock',
          title: 'Tiempos Extra',
          path: 'tiempos-extra',
          isActive: false
        },
      ]
    },
    {
      title: 'FALTAS',
      visible: true,
      subitems: [
        {
          icon: 'list',
          title: 'Registros',
          path: 'faltas',
          isActive: false
        },
        {
          icon: 'chart-bar',
          title: 'Estadística',
          path: 'faltas-estadistica',
          isActive: false
        },
      ]
    },
    {
      title: 'VACACIONES',
      visible: true,
      subitems: [
        {
          icon: 'list',
          title: 'Registros',
          path: 'vacaciones',
          isActive: false
        },
        {
          icon: 'chart-bar',
          title: 'Estadística',
          path: 'vacaciones-estadistica',
          isActive: false
        },
      ]
    },
    {
      title: 'RECOMENDACIONES',
      visible: true,
      subitems: [
        {
          icon: 'list',
          title: 'Registros',
          path: 'recomendaciones',
          isActive: false
        },
        {
          icon: 'dollar',
          title: 'Pagos',
          path: 'recomendaciones-pagos',
          isActive: false
        },
      ]
    },
    {
      title: 'EMPRESA',
      visible: true,
      subitems: [
        {
          icon: 'home',
          title: 'Areas',
          path: 'areas',
          isActive: false
        },
        {
          icon: 'briefcase',
          title: 'Puestos',
          path: 'puestos',
          isActive: false
        },
        {
          icon: 'building',
          title: 'Departamentos',
          path: 'departamentos',
          isActive: false
        },
        {
          icon: 'heart',
          title: 'Enfermedades',
          path: 'enfermedades',
          isActive: false
        },
        {
          icon: 'stopwatch',
          title: 'Tipos de faltas',
          path: 'tipos-de-faltas',
          isActive: false
        },
        {
          icon: 'share-alt',
          title: 'Métodos de reclutamiento',
          path: 'metodos-de-reclutamiento',
          isActive: false
        },
      ]
    }
  ]

  constructor(
    public sidebarService: SidebarService
  ) {
  }

  closeCallback($event: any) {

  }

  changeVisibilityToModuleItem(moduleItem: SidebarModuleItem) {
    moduleItem.visible = !moduleItem.visible
  }


}
