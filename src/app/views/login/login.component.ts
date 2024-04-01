import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarService } from '../../../../shared/helpers/services/sidebar.service';
import { LoginRequest } from '../../interfaces/auth';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, InputTextModule, RouterModule, CheckboxModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  body: LoginRequest
  alertUnauthorized: boolean = false;
  loading: boolean = false;


  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.body = {
      email: '',
      password: ''
    }
  }

  ngOnInit() {
    this.sidebarService.setOnStorage(true)
  }

  onSubmit(form: NgForm) {
    this.loading = true;
    this.alertUnauthorized = false;
    this.authService.login(this.body).subscribe({
      next: (response) => {
        this.alertUnauthorized = false;
        this.authService.setTokenOnStorage(response.token)
        this.loading = false;
        this.router.navigate(['/dashboard'], { relativeTo: this.route });
      },
      error: (e) => {
        this.alertUnauthorized = true;
        this.loading = false;
      }
    })
  }
}
