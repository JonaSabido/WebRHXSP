import { Component, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { FileUploadModule } from 'primeng/fileupload';
import { SplitButtonModule } from 'primeng/splitbutton';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { DialogCrud } from '../../../../shared/helpers/dialog';
import { DepartmentResponse } from '../../interfaces/department';
import { JobResponse } from '../../interfaces/job';
import { DepartmentService } from '../../core/services/department.service';
import { JobService } from '../../core/services/job.service';


@Component({
  selector: 'app-employee-dialog',
  standalone: true,
  imports: [StepsModule, InputTextModule, FileUploadModule, SplitButtonModule, DropdownModule, CalendarModule, FormsModule],
  templateUrl: './employee-dialog.component.html',
  styleUrl: './employee-dialog.component.scss'
})
export class EmployeeDialogComponent extends DialogCrud {
  @ViewChild('formPersonal') formPersonal: NgForm = {} as NgForm;
  @ViewChild('formContact') formContact: NgForm = {} as NgForm;
  @ViewChild('formEnterprise') formEnterprise: NgForm = {} as NgForm;

  stepItems: MenuItem[] = [];
  menuItems: MenuItem[] = [];
  menuItemsForNull: MenuItem[] = [];
  departments: DepartmentResponse[];
  jobs: JobResponse[]
  activeIndex: number = 0;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private departmentService: DepartmentService,
    private jobService: JobService,
  ) {
    super(ref, config)
    this.departments = []
    this.jobs = []
  }

  onActiveIndexChange(event: number) {
    this.activeIndex = event;
  }

  ngOnInit() {
    this.departmentService.all().subscribe(response => this.departments = response.data)
    this.jobService.all().subscribe(response => this.jobs = response.data)
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



}
