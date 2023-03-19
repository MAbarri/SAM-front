import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private apiUrl = 'https://api.smart-assistant-mate.com/users';

    constructor(private http: HttpClient) { }

    getActiveUser(userId:any): Observable<any> {
        return this.http.get(this.apiUrl + "/" + userId +"/active");
    }
}