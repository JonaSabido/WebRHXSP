import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
  imports: [],
  templateUrl: './breadcrumb.component.html',
  styleUrl: './breadcrumb.component.scss'
})
export class BreadcrumbComponent {
  @Input() icon: string = ''
  @Input() module: string = ''
  @Input() prevLinks: string[] = []
  @Input() activeLink: string = ''
}
