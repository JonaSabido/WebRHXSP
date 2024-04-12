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
import { EmployeeService } from '../../core/services/employee.service';
import { FileName } from '../../interfaces/file-name';


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
  menuItems: MenuItem[][] = [];
  menuItemsForNull: MenuItem[] = [];
  departments: DepartmentResponse[];
  jobs: JobResponse[]
  activeIndex: number = 0;
  formData: FormData = new FormData()
  fileNames: FileName | any;


  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private departmentService: DepartmentService,
    private jobService: JobService,
    private employeeService: EmployeeService,
  ) {
    super(ref, config)
    this.departments = []
    this.jobs = []
    this.fileNames = {
      birth_certificate: '',
      identification: '',
      curp: '',
      nss: '',
      address_certification: '',
      studies_certification: '',
      type_studies_certification: '',
      tax_certificate: '',
      smn: '',
      no_criminal_certificate: '',
      health_certificate: '',
      sv: '',
    }
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

    for (const key in this.fileNames) {
      this.menuItems.push(
        [
          {
            label: 'Ver',
            icon: 'pi pi-eye',
            command: () => {
              this.openFile(this.config.data.entity[`path_${key}`])
            }
          },
          {
            label: 'Subir',
            icon: 'pi pi-upload',
            command: () => {
              var fileInput = document.getElementById(`input_${key}`);
              fileInput?.click();
            }
          },
          {
            label: 'Descargar',
            icon: 'pi pi-download',
            command: () => {
            }
          },
          // {
          //   label: 'Eliminar',
          //   icon: 'pi pi-trash',
          //   command: () => {
          //     // this.delete();
          //   }
          // },
        ]
      )
    }

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

  openFile(path: string) {
    console.log(path)
    window.open(path, '_blank');
  }

  getFile(event: Event, fileName: string) {
    const target = event.target as HTMLInputElement

    const files: FileList | null = target.files

    if (files!.length > 0 && files != null) {
      Array.prototype.forEach.call(files, (file: File) => {
        this.formData.append(fileName, file)
        this.fileNames[fileName] = file.name
      })
    }
  }

  saveUploads() {
    this.employeeService.uploadFiles(this.config.data.entity.id, this.formData).subscribe(response => console.log(response))
  }



}
