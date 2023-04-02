import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { from, map, Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private apiUrl = environment.apiURL + '/auth/login';

    constructor(public afAuth: AngularFireAuth, private http: HttpClient) { }

    loginWithEmailOnly(email: any): Observable<any> {
        const { friendlyName } = email.split('@')[0];
        return this.http.post(this.apiUrl, { email, friendlyName }).pipe(
            map((response: any) => {
                // Assuming the server responds with a JWT token in the 'token' property
                if (response && response.accessToken) {
                    let token = response.accessToken;
                    // Store the JWT token in local storage or cookies for future use
                    localStorage.setItem('token', token);
                    return { Success: 'User authenticated' };
                } else {
                    return { Error: 'No user data available' };
                }
            })
        );
    }
    
    googleSignIn(): Observable<any> {
        const provider = new firebase.auth.GoogleAuthProvider();
        return from(this.afAuth.signInWithPopup(provider)).pipe(
            switchMap(async (credential) => {
                if (credential && credential.user) {
                    
                    const { email, displayName: friendlyName } = credential.user;
                    const response: any = await this.http.post(this.apiUrl, { email, friendlyName }).toPromise();
                    // Assuming the server responds with a JWT token in the 'token' property
                    if (response && response.accessToken) {
                        let token = response.accessToken;
                        // Store the JWT token in local storage or cookies for future use
                        localStorage.setItem('token', token);
                        return { Success: 'User authenticated' };
                    } else
                        return { Error: 'No user data available' };

                } else {
                    return { Error: 'No user data available' };
                }
            })
        );
    }
    facebookSignIn(): Observable<any> {
        const provider = new firebase.auth.FacebookAuthProvider();
        return from(this.afAuth.signInWithPopup(provider)).pipe(
            switchMap(async (credential) => {
                if (credential && credential.user) {
                    const { email, displayName: friendlyName } = credential.user;
                    const response: any = await this.http
                        .post(this.apiUrl, { email, friendlyName })
                        .toPromise();
                    if (response && response.accessToken) {
                        let token = response.accessToken;
                        localStorage.setItem('token', token);
                        return { Success: 'User authenticated' };
                    } else return { Error: 'No user data available' };
                } else {
                    return { Error: 'No user data available' };
                }
            })
        );
    }

    isAuthenticated(): boolean {
        const token = localStorage.getItem('token');
        return !!token; // Returns true if the token exists, false if it's null or undefined
    }
    
}
