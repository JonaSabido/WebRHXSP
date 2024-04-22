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
import { ExtraTimeFileName } from '../../interfaces/extra-time';

@Component({
  selector: 'app-extra-time-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule, FormsModule],
  templateUrl: './extra-time-dialog.component.html',
  styleUrl: './extra-time-dialog.component.scss'
})
export class ExtraTimeDialogComponent extends DialogCrud {
  @ViewChild('form') formPersonal: NgForm = {} as NgForm;

  employees: EmployeeResponse[]
  formData: FormData = new FormData()
  extraTimeFileNames: ExtraTimeFileName | any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private employeeService: EmployeeService
  ) {
    super(ref, config)
    this.employees = []
    this.extraTimeFileNames = {
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
        this.extraTimeFileNames[fileName] = file.name
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
