import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const speechToTextApiUrl = 'https://api.openai.com/v1/audio/transcriptions';

        if (req.url === speechToTextApiUrl) {
            // If so, skip applying the login token and send the original request
            return next.handle(req);
        }
        // Get the token from local storage
        const token = localStorage.getItem('token');

        // If the token exists, add it to the authorization header
        if (token) {
            req = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${token}`)
            });
        }

        // Handle the request and catch 401 Unauthorized errors
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    localStorage.removeItem('token');
                    this.router.navigate(['/']);
                }
                return throwError(error);
            })
        );
    }
}
