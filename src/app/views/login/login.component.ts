import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxModule } from 'primeng/checkbox';
import { SidebarService } from '../../../../shared/helpers/services/sidebar.service';
import { LoginRequest } from '../../interfaces/auth';
import { AuthService } from '../../core/services/auth.service';
import { FormsModule, NgForm } from '@angular/forms';
import { JwtService } from '../../../../shared/services/jwt.service';

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
  returnUrl: string;

  constructor(
    private sidebarService: SidebarService,
    private authService: AuthService,
    private jwtService: JwtService,
    public route: ActivatedRoute,
    public router: Router
  ) {
    this.body = {
      email: '',
      password: ''
    }
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  ngOnInit() {
    this.sidebarService.setOnStorage(true)
    if(this.jwtService.tokenIsValid()){
      this.router.navigate([this.returnUrl]);
    }
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
