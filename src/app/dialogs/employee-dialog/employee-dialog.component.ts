import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { FileUploadModule } from 'primeng/fileupload';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';


@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [StepsModule, InputTextModule, FileUploadModule, SplitButtonModule, DropdownModule, CalendarModule],
  templateUrl: './employee-dialog.component.html',
  styleUrl: './employee-dialog.component.scss'
})
export class EmployeeDialogComponent {
  stepItems: MenuItem[] = [];
  menuItems: MenuItem[] = [];
  menuItemsForNull: MenuItem[] = [];


  activeIndex: number = 0;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) { }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  ngOnInit() {
    this.stepItems = [
      {
        label: 'Personal',
      },
      {
        label: 'Contacto/Fiscal',
      },
      {
        label: 'Empresa',
      },
      {
        label: 'Archivos',
      }
    ];

    this.menuItems = [
      {
        label: 'Ver',
        icon: 'pi pi-eye',
        command: () => {
          // this.update();
        }
      },
      {
        label: 'Cambiar',
        icon: 'pi pi-refresh',
        command: () => {
          // this.delete();
        }
      },
      {
        label: 'Descargar',
        icon: 'pi pi-download',
        command: () => {
          // this.delete();
        }
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-trash',
        command: () => {
          // this.delete();
        }
      },
    ];

    this.menuItemsForNull = [
      {
        label: 'Subir',
        icon: 'pi pi-upload',
        command: () => {
          // this.update();
        }
      }
    ];
  }

  closeDialog() {
    this.ref.close()
  }
}
