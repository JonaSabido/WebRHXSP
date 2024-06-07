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
import { TypeLeaveResponse } from '../../interfaces/type-leave';
import { TypeLeaveService } from '../../core/services/type-leave.service';

@Component({
  selector: 'app-employee-leave-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule, FormsModule],
  templateUrl: './employee-leave-dialog.component.html',
  styleUrl: './employee-leave-dialog.component.scss'
})
export class EmployeeLeaveDialogComponent extends DialogCrud {
  @ViewChild('form') form: NgForm = {} as NgForm;
  employees: EmployeeResponse[]
  typeLeaves: TypeLeaveResponse[]

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private employeeService: EmployeeService,
    private typeLeaveService: TypeLeaveService

  ) {
    super(ref, config)
    this.employees = []
    this.typeLeaves = []
  }

  ngOnInit() {
    this.employeeService.all([{ label: 'Empleado', property: 'status', value: 1 }]).subscribe(response => this.employees = response.data)
    this.typeLeaveService.all().subscribe(response => this.typeLeaves = response.data)
  }


}
