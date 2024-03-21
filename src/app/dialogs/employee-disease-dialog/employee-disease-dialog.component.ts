import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogCrud } from '../../../../shared/helpers/dialog';
import { EmployeeResponse } from '../../interfaces/employee';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeDiseaseService } from '../../core/services/employee-disease.service';
import { EmployeeService } from '../../core/services/employee.service';
import { DiseaseResponse } from '../../interfaces/disease';
import { DiseaseService } from '../../core/services/disease.service';

@Component({
  selector: 'app-employee-disease-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule, FormsModule],
  templateUrl: './employee-disease-dialog.component.html',
  styleUrl: './employee-disease-dialog.component.scss'
})
export class EmployeeDiseaseDialogComponent extends DialogCrud {
  @ViewChild('form') form: NgForm = {} as NgForm;
  employees: EmployeeResponse[]
  diseases: DiseaseResponse[]

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public employeeService: EmployeeService,
    public diseaseService: DiseaseService,
  ) {
    super(ref, config)
    this.employees = []
    this.diseases = []
  }

  ngOnInit() {
    this.employeeService.all().subscribe(response => this.employees = response.data)
    this.diseaseService.all().subscribe(response => this.diseases = response.data)

  }


}
