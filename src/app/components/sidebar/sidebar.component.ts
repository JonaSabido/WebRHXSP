import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { SidebarModuleItem } from '../../interfaces/sidebar';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SidebarModule, ButtonModule, AvatarModule, RippleModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  sidebarModuleItems: SidebarModuleItem[] = [
    {
      title: 'EMPLEADOS',
      visible: true,
      subitems: [
        {
          icon: 'list',
          title: 'Registros',
          path: '',
          isActive: false
        },
        {
          icon: 'angle-double-up',
          title: 'Reingresos',
          path: '',
          isActive: false
        },
        {
          icon: 'angle-double-down',
          title: 'Bajas',
          path: '',
          isActive: false
        },
        {
          icon: 'heart',
          title: 'Enfermedades',
          path: 'Núm. de Emergencia',
          isActive: false
        },
        {
          icon: 'phone',
          title: 'Números de emergencia',
          path: '',
          isActive: false
        },
        {
          icon: 'book',
          title: 'Contratos',
          path: '',
          isActive: false
        },
        {
          icon: 'ticket',
          title: 'Antidopings',
          path: '',
          isActive: false
        },
        {
          icon: 'tablet',
          title: 'Capacitaciones',
          path: '',
          isActive: false
        },
        {
          icon: 'clock',
          title: 'Tiempos Extra',
          path: '',
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
          path: '',
          isActive: false
        },
        {
          icon: 'chart-bar',
          title: 'Estadística',
          path: '',
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
          path: '',
          isActive: false
        },
        {
          icon: 'chart-bar',
          title: 'Estadística',
          path: '',
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
          path: '',
          isActive: false
        },
        {
          icon: 'dollar',
          title: 'Pagos',
          path: '',
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
          path: '',
          isActive: false
        },
        {
          icon: 'briefcase',
          title: 'Trabajos',
          path: '',
          isActive: false
        },
        {
          icon: 'building',
          title: 'Departamentos',
          path: '',
          isActive: false
        },
        {
          icon: 'stopwatch',
          title: 'Tipos de faltas',
          path: '',
          isActive: false
        },
        {
          icon: 'heart',
          title: 'Enfermedades',
          path: '',
          isActive: false
        },
      ]
    }
  ]

  sidebarVisible: boolean = false;

  constructor() {
  }

  closeCallback($event: any) {

  }

  changeVisibilityToModuleItem(moduleItem: SidebarModuleItem) {
    moduleItem.visible = !moduleItem.visible
  }



}
