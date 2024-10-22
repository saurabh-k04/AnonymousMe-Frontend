import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule], // Import the required modules here
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  responseMessage: any;
  constructor(private http: HttpClient, private router: Router) {}

    onSignup(form: NgForm) {
        // this.http.post('http://localhost:8080/api/users/signup', form.value).subscribe(
        //     response => {
        //         console.log('Signup successful', response);
        //         this.router.navigate(['/login']); // Redirect to login
        //     },
        //     error => {
        //         console.error('Signup failed', error);
        //     }
        // );
        if (form.valid) {
          this.http.post('http://localhost:8080/api/users/signup', form.value).pipe(
            map((response: any) => {
              console.log('Signup successful', response);
              this.responseMessage = response.message; // Set the message from the response
            }),
            catchError((error) => {
              console.error('Signup failed', error);
              this.responseMessage = error.error.message || 'Signup failed. Please try again.'; // Set error message
              return of(null); // Return an observable
            })
          ).subscribe(); // Subscribe to trigger the request
        }
    }
}
