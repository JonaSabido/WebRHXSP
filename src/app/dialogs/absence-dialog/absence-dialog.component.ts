import { Component, ViewChild } from '@angular/core';
import { DialogCrud } from '../../../../shared/helpers/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, NgForm } from '@angular/forms';
import { EmployeeResponse } from '../../interfaces/employee';
import { TypeAbsenceResponse } from '../../interfaces/type-absence';
import { EmployeeService } from '../../core/services/employee.service';
import { TypeAbsenceService } from '../../core/services/type-absence.service';

@Component({
  selector: 'app-absence-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule, FormsModule],
  templateUrl: './absence-dialog.component.html',
  styleUrl: './absence-dialog.component.scss'
})
export class AbsenceDialogComponent extends DialogCrud {
  @ViewChild('form') form: NgForm = {} as NgForm;
  employees: EmployeeResponse[];
  typeAbsences: TypeAbsenceResponse[];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private employeeService: EmployeeService,
    private typeAbsenceService: TypeAbsenceService

  ) {
    super(ref, config)
    this.employees = []
    this.typeAbsences = []
  }

  ngOnInit() {
    this.employeeService.all().subscribe(response => this.employees = response.data)
    this.typeAbsenceService.all().subscribe(response => this.typeAbsences = response.data)
  }
}
