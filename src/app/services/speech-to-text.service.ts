import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SpeechToTextService {
    private mediaRecorder: MediaRecorder;
    private audioChunks: Blob[] = [];
    private accessToken: string = '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';

    constructor(private http: HttpClient) { }

    startRecording(): void {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            this.audioChunks = [];
            this.mediaRecorder = new MediaRecorder(stream);
            this.mediaRecorder.start();

            this.mediaRecorder.addEventListener('dataavailable', event => {
                this.audioChunks.push(event.data);
            });
        });
    }

    stopRecording(): Promise<Blob> {
        return new Promise((resolve, reject) => {
            this.mediaRecorder.addEventListener('stop', () => {
                const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
                resolve(audioBlob);
            });

            this.mediaRecorder.stop();
        });
    }

    sendRecording(audioBlob: Blob): Observable<any> {
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.wav');
        formData.append('model', 'whisper-1');

        const headers = new HttpHeaders({
            Authorization: `Bearer ${this.accessToken}`
        });

        return this.http.post('https://api.openai.com/v1/audio/transcriptions', formData, {
            headers: headers
        });
    }
}
