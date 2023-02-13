import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConversationService {
    private apiUrl = '/api/';

    constructor(private http: HttpClient) { }

    sendMessage(param:any): Observable<any> {
        return this.http.post(this.apiUrl, {query: param});
    }
}