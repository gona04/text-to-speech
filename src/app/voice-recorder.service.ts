import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoiceRecorderService {
  auth_token = "eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleTEiLCJ0eXAiOiJKV1QifQ.eyJyZWdpb24iOiJlYXN0dXMiLCJzdWJzY3JpcHRpb24taWQiOiJhZmM4NGUzODExYmY0NDVkYjU1Zjk2ZTUzNDAyNGI0MyIsInByb2R1Y3QtaWQiOiJTcGVlY2hTZXJ2aWNlcy5GMCIsImNvZ25pdGl2ZS1zZXJ2aWNlcy1lbmRwb2ludCI6Imh0dHBzOi8vYXBpLmNvZ25pdGl2ZS5taWNyb3NvZnQuY29tL2ludGVybmFsL3YxLjAvIiwiYXp1cmUtcmVzb3VyY2UtaWQiOiIvc3Vic2NyaXB0aW9ucy84Y2IzM2RkZC1jMjY3LTQ3M2QtYmFlMi02ZmQ1YjlkNGMxMzQvcmVzb3VyY2VHcm91cHMvY2FtYnJpYW5DbG91ZC9wcm92aWRlcnMvTWljcm9zb2Z0LkNvZ25pdGl2ZVNlcnZpY2VzL2FjY291bnRzL3RhbGt0b3dyaXRlIiwic2NvcGUiOiJzcGVlY2hzZXJ2aWNlcyIsImF1ZCI6InVybjptcy5zcGVlY2hzZXJ2aWNlcy5lYXN0dXMiLCJleHAiOjE2OTYwMzAxNDQsImlzcyI6InVybjptcy5jb2duaXRpdmVzZXJ2aWNlcyJ9";
  url = "https://eastus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1"
  headers = new HttpHeaders()
  .set('Content-Type', 'audio/ogg')
  .set('Ocp-Apim-Subscription-Key', '01dc14dfa31548278522b451fa92cbd5')
  .set('Authorization', 'Bearer ${auth_token}')
  constructor(private http: HttpClient) { }

  submitVocalFile(audioFile: any): Observable<any> {
    return this.http.post(this.url + '?language=en-US', audioFile, {
      headers: this.headers,
      responseType: 'json' // Specify the response type as JSON if needed
    });
  }

}
