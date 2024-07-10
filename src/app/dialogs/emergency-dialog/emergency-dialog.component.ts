import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogCrud } from '../../../../shared/helpers/dialog';
import { EmployeeResponse } from '../../interfaces/employee';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee.service';
import { typeOptions } from '../../interfaces/emergency';

@Component({
  selector: 'app-emergency-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule, FormsModule],
  templateUrl: './emergency-dialog.component.html',
  styleUrl: './emergency-dialog.component.scss'
})
export class EmergencyDialogComponent extends DialogCrud {
  @ViewChild('form') form: NgForm = {} as NgForm;
  employees: EmployeeResponse[]
  typeOptions = typeOptions
  
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
}
