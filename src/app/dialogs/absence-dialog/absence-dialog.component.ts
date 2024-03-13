import { Component } from '@angular/core';
import { DialogCrud } from '../../../../shared/helpers/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-absence-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule],
  templateUrl: './absence-dialog.component.html',
  styleUrl: './absence-dialog.component.scss'
})
export class AbsenceDialogComponent extends DialogCrud {
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

  types = [
    {
      name: "PCG"
    },
    {
      name: "PSG"
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
