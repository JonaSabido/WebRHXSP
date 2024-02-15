import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-employee-disease-dialog',
  standalone: true,
  imports: [DialogModule, InputTextModule, ButtonModule, DropdownModule],
  templateUrl: './employee-disease-dialog.component.html',
  styleUrl: './employee-disease-dialog.component.scss'
})
export class EmployeeDiseaseDialogComponent {
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
  diseases = [
    {
      name: 'Ansiedad',
    },
    {
      name: 'Hipertensión'
    },
    {
      name: 'Diabetes'
    },
    {
      name: 'Alergia a la penicilina'
    },


  ]
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {

  }
  ngOnInit() {
  }

  closeDialog() {
    this.ref.close()
  }
}
