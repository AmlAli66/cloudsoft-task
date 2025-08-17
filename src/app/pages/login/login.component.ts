import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule ,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  // username = '';
  // password = '';
  // loading = false;
  // errorMessage = '';

  // constructor(private authService: AuthService, private router: Router) {}

  // onLogin() {
  //   this.loading = true;
  //   this.errorMessage = '';

  //   this.authService.login(this.username, this.password).subscribe({
  //     next: (res) => {
  //       localStorage.setItem('token', res.access_token);
  //       localStorage.setItem('username', res.userName);
  //       this.router.navigate(['/seafarers']);
  //     },
  //     error: (err) => {
  //       this.errorMessage = 'Invalid username or password';
  //       this.loading = false;
  //     },
  //     complete: () => {
  //       this.loading = false;
  //     }
  //   });
  // }

  loginForm!: FormGroup; // Define the form group
  loading = false;
  errorMessage = '';

  constructor(
    private authService: AuthService, 
    private router: Router,
    private fb: FormBuilder // Inject FormBuilder
  ) {}
  
  ngOnInit(): void {
    // Initialize the reactive form in ngOnInit
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /**
   * Handles the login form submission using the reactive form data.
   */
  onLogin(): void {
    // Check if the form is valid before proceeding
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    
    this.loading = true;
    this.errorMessage = '';

    const { username, password } = this.loginForm.value;

    this.authService.login(username, password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.access_token);
        localStorage.setItem('username', res.userName);
        this.router.navigate(['/seafarers']);
      },
      error: (err) => {
        this.errorMessage = 'Invalid username or password';
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
}
