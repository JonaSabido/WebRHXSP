import { Component } from '@angular/core';
import { DialogCrud } from '../../../../shared/helpers/dialog';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-recomendation-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule],
  templateUrl: './recomendation-dialog.component.html',
  styleUrl: './recomendation-dialog.component.scss'
})
export class RecomendationDialogComponent extends DialogCrud {
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
