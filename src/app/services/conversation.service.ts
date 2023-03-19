import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ConversationService {
    private apiUrl = 'https://api.smart-assistant-mate.com/conversations';

    constructor(private http: HttpClient) { }

    // sendMessage(param:any): Observable<any> {
    //     return this.http.post(this.apiUrl + "/start", { message: param});
    // }
    sendMessage(conversationId: any, userId: any, messageContent: any): Observable<any> {
        return this.http.post(this.apiUrl + "/" + conversationId + "/message", { userId: userId, messageContent: messageContent });
    }
    startNewConversation(userId: any): Observable<any> {
        return this.http.post(this.apiUrl , { userId: userId });
    }

    getActiveConversation(userId:any): Observable<any> {
        return this.http.get(this.apiUrl + "/" + userId +"/activeConversation");
    }

    getConversation(userId:any, conversationId : any): Observable<any> {
        return this.http.get(this.apiUrl + "/" + userId +"/"+conversationId);
    }

    getLastEightConvos(userId:any): Observable<any> {
        return this.http.get(this.apiUrl + "/" + userId +"/last-eight");
    }

    deleteConversation(userId: any, conversationId: any): Observable<any> {
        return this.http.delete(this.apiUrl + "/" + userId + "/" + conversationId);
    }
    deleteAllConversation(userId: any): Observable<any> {
        return this.http.delete(this.apiUrl + "/" + userId + "");
    }




    
}