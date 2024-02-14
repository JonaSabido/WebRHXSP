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
          icon: 'home',
          title: 'Enfermedades',
          path: 'Núm. de Emergencia',
          isActive: false
        },
        {
          icon: 'home',
          title: 'Contratos',
          path: '',
          isActive: false
        },
        {
          icon: 'home',
          title: 'Antidopings',
          path: '',
          isActive: false
        },
        {
          icon: 'home',
          title: 'Capacitaciones',
          path: '',
          isActive: false
        },
        {
          icon: 'home',
          title: 'Registros',
          path: '',
          isActive: false
        },
        {
          icon: 'home',
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
          icon: 'home',
          title: 'Registros',
          path: '',
          isActive: false
        },
        {
          icon: 'home',
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
          icon: 'home',
          title: 'Registros',
          path: '',
          isActive: false
        },
        {
          icon: 'home',
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
          icon: 'home',
          title: 'Registros',
          path: '',
          isActive: false
        },
        {
          icon: 'home',
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
          icon: 'home',
          title: 'Trabajos',
          path: '',
          isActive: false
        },
        {
          icon: 'home',
          title: 'Departamentos',
          path: '',
          isActive: false
        },
        {
          icon: 'home',
          title: 'Tipos de faltas',
          path: '',
          isActive: false
        },
        {
          icon: 'home',
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
