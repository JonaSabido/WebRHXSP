import { Component, Input } from '@angular/core';
import { AntidopingResponse } from '../../interfaces/antidoping';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-card-employee-file',
  standalone: true,
  imports: [AvatarModule, ButtonModule, TagModule],
  templateUrl: './card-employee-file.component.html',
  styleUrl: './card-employee-file.component.scss'
})
export class CardEmployeeFileComponent {
  @Input() cardTitle: string = ''
  @Input() image: string = ''
  @Input() name: string = ''
  @Input() date: string = ''
  @Input() id: number = 0
}
