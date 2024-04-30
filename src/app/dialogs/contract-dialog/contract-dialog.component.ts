import { Component, ViewChild } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DialogCrud } from '../../../../shared/helpers/dialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeResponse } from '../../interfaces/employee';
import { EmployeeService } from '../../core/services/employee.service';
import { ContractFileName } from '../../interfaces/contract';

@Component({
  selector: 'app-contract-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule, FormsModule],
  templateUrl: './contract-dialog.component.html',
  styleUrl: './contract-dialog.component.scss'
})
export class ContractDialogComponent extends DialogCrud {
  @ViewChild('form') form: NgForm = {} as NgForm;
  employees: EmployeeResponse[]
  formData: FormData = new FormData()
  contractFileNames: ContractFileName | any;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private employeeService: EmployeeService
  ) {
    super(ref, config)
    this.employees = []
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
        this.contractFileNames[fileName] = file.name
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
