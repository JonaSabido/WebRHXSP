import { Component } from '@angular/core';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-area-dialog',
  standalone: true,
  imports: [DialogModule],
  templateUrl: './area-dialog.component.html',
  styleUrl: './area-dialog.component.scss'
})
export class AreaDialogComponent {
}
