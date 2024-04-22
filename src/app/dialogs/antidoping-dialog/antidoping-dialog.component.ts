import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeResponse } from '../../interfaces/employee';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeService } from '../../core/services/employee.service';
import { DialogCrud } from '../../../../shared/helpers/dialog';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { AntidopingFileName } from '../../interfaces/antidoping';

@Component({
  selector: 'app-antidoping-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule, FormsModule],
  templateUrl: './antidoping-dialog.component.html',
  styleUrl: './antidoping-dialog.component.scss'
})
export class AntidopingDialogComponent extends DialogCrud {
  @ViewChild('form') formPersonal: NgForm = {} as NgForm;

  employees: EmployeeResponse[]
  formData: FormData = new FormData()
  antidopingFileNames: AntidopingFileName | any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private employeeService: EmployeeService
  ) {
    super(ref, config)
    this.employees = []
    this.antidopingFileNames = {
      photo: '',
      evidence: '',
    }
  }

  ngOnInit() {
    this.employeeService.all().subscribe(response => this.employees = response.data)
  }

  openFile(path: string) {
    window.open(path, '_blank');
  }

  getFile(event: Event, fileName: string) {
    const target = event.target as HTMLInputElement

    const files: FileList | null = target.files

    if (files!.length > 0 && files != null) {
      Array.prototype.forEach.call(files, (file: File) => {
        this.formData.delete(fileName)
        this.formData.append(fileName, file)
        this.antidopingFileNames[fileName] = file.name

        if (fileName == 'photo') {
          const reader = new FileReader();

          reader.onload = () => {
            const previewDiv = document.getElementById('photo-preview');
            if (previewDiv) {
              previewDiv.style.backgroundImage = `url('${reader.result}')`;
            }
          };

          reader.readAsDataURL(file);
        }
      })
    }
  }

  generateFormData() {
    Object.entries(this.config.data.entity).forEach(([key, value]) => {
      this.formData.append(key, value as string);
    });
    this.save(this.formData)
  }
}
