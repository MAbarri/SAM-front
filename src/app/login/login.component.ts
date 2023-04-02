import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { shake, ShakeService } from "../shakre.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [shake]
})
export class LoginComponent implements OnInit {
  userAgent : any;
  isMobileApp : boolean = false;
  loginEmail: any;
  constructor(private authService: AuthService, private router: Router, public shaker: ShakeService) {
    document.body.className = "body-style";
}

  ngOnInit(): void {
    this.userAgent = navigator.userAgent;
    this.isMobileApp = this.userAgent != "samapp";
    console.log('is mobile app:', this.isMobileApp);
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
  signInWithFacebook() {
    this.authService.facebookSignIn().subscribe(
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
  signInWithEmail(){
    if (!this.loginEmail || !this.isValidEmail(this.loginEmail)) {
      this.shaker.toggle();
    } else {

      this.authService.loginWithEmailOnly(this.loginEmail).subscribe(
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
  }
  isValidEmail(email: string): boolean {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email.toLowerCase());
  }

  ngOnDestroy() {
    document.body.className = "";
  }
}
