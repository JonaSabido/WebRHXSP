import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DialogCrud } from '../../../../shared/helpers/dialog';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, FormsModule],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.scss'
})
export class UserDialogComponent extends DialogCrud {
  @ViewChild('form') form: NgForm = {} as NgForm; 

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    super(ref, config)
  }

  ngOnInit() {
  }

  get checkPasswordConfirmation() {
    return this.config.data.entity.password !== this.config.data.entity.password_confirmation
  }

}
