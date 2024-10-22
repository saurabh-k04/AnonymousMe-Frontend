import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule], // Import the required modules here
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  responseMessage: string = ''; // Property to hold the response message
  responseErrorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onLogin(form: NgForm) {
  //   console.log("method start");
  //     this.http.post('http://localhost:8080/api/users/login', form.value).subscribe(
  //         response => {
  //             console.log('Login successful', response);
  //             this.responseMessage = response.message; 
  //             // Store token if using JWT, then redirect
  //             this.router.navigate(['/dashboard']);
  //         },
  //         error => {
  //             console.error('Login failed', error);
  //         }
  //     );
      if (form.valid) {
        console.log(form.value);
        this.http.post('http://localhost:8080/api/users/login', form.value).pipe(
          map((response: any) => {
            console.log('Login successful', response);
            this.responseMessage = response.message; // Adjust as per your backend response
        }),
        catchError((error: HttpErrorResponse) => {
            console.error('Login failed', error);
            this.responseMessage = error.error.message || 'Login failed. Please check your credentials.';
            return of(null);
        })
        ).subscribe();
      }
  }

}
