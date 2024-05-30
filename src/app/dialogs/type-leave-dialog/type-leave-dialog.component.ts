import { Component, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogCrud } from '../../../../shared/helpers/dialog';


@Component({
  selector: 'app-type-leave-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, FormsModule],
  templateUrl: './type-leave-dialog.component.html',
  styleUrl: './type-leave-dialog.component.scss'
})
export class TypeLeaveDialogComponent extends DialogCrud {
  @ViewChild('form') form: NgForm = {} as NgForm;

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    super(ref, config)
  }
  ngOnInit() {
  }
}
