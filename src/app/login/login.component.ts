import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) {
    document.body.className = "body-style";
}

  ngOnInit(): void {
  }
  signInWithGoogle() {
    this.authService.googleSignIn().subscribe(
      (response) => {
        console.log('response fron front : ', response)
        // Redirect to the desired page after successful authentication
        this.router.navigate(['/talk']);
      },
      (error) => {
        console.error('Error during authentication:', error);
      }
    );
  }

  ngOnDestroy() {
    document.body.className = "";
  }
}
