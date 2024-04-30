import { Component, ViewChild } from '@angular/core';
import { DialogCrud } from '../../../../shared/helpers/dialog';
import { EmployeeService } from '../../core/services/employee.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeResponse } from '../../interfaces/employee';
import { FormsModule, NgForm } from '@angular/forms';
import { UniformTypes } from '../../interfaces/uniform';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-uniform-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule, FormsModule],
  templateUrl: './uniform-dialog.component.html',
  styleUrl: './uniform-dialog.component.scss'
})
export class UniformDialogComponent extends DialogCrud {
  @ViewChild('form') form: NgForm = {} as NgForm;
  employees: EmployeeResponse[]
  types = UniformTypes

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
