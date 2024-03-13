import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DialogCrud } from '../../../../shared/helpers/dialog';

@Component({
  selector: 'app-employee-reentry-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule],
  templateUrl: './employee-reentry-dialog.component.html',
  styleUrl: './employee-reentry-dialog.component.scss'
})
export class EmployeeReentryDialogComponent extends DialogCrud {
  employees = [
    {
      fullname: 'Juan Olmo',

    },
    {
      fullname: 'Maria Rodriguez',

    },
    {
      fullname: 'Luis Martinez',

    },
    {
      fullname: 'Ana Garcia',

    },
    {
      fullname: 'Pedro Lopez',

    },
    {
      fullname: 'Laura Fernandez',

    },
    {
      fullname: 'Carlos Gomez',

    },
    {
      fullname: 'Sofia Diaz',

    },
    {
      fullname: 'Diego Torres',

    },
    {
      fullname: 'Elena Ramirez',

    },
    {
      fullname: 'Miguel Sánchez',

    },
    {
      fullname: 'Fernanda González',

    },
    {
      fullname: 'Javier Aguilar',

    },
    {
      fullname: 'Susana Torres',

    },
    {
      fullname: 'Ricardo Herrera',

    }
  ]

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    super(ref, config)
  }

  ngOnInit() {
  }

}