import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VoiceRecorderService {

  auth_token = "eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleTEiLCJ0eXAiOiJKV1QifQ.eyJyZWdpb24iOiJjYW5hZGFjZW50cmFsIiwic3Vic2NyaXB0aW9uLWlkIjoiNzgwY2FmNmYzZDM2NDM0NjhlMTMxMjJmODkxNjU3YzciLCJwcm9kdWN0LWlkIjoiU3BlZWNoU2VydmljZXMuRjAiLCJjb2duaXRpdmUtc2VydmljZXMtZW5kcG9pbnQiOiJodHRwczovL2FwaS5jb2duaXRpdmUubWljcm9zb2Z0LmNvbS9pbnRlcm5hbC92MS4wLyIsImF6dXJlLXJlc291cmNlLWlkIjoiL3N1YnNjcmlwdGlvbnMvOGNiMzNkZGQtYzI2Ny00NzNkLWJhZTItNmZkNWI5ZDRjMTM0L3Jlc291cmNlR3JvdXBzL0RlZmF1bHRSZXNvdXJjZUdyb3VwLWNhbmFkYWVhc3QvcHJvdmlkZXJzL01pY3Jvc29mdC5Db2duaXRpdmVTZXJ2aWNlcy9hY2NvdW50cy90YWxrdG93cml0ZSIsInNjb3BlIjoic3BlZWNoc2VydmljZXMiLCJhdWQiOiJ1cm46bXMuc3BlZWNoc2VydmljZXMuY2FuYWRhY2VudHJhbCIsImV4cCI6MTcwMTgwNzE1MSwiaXNzIjoidXJuOm1zLmNvZ25pdGl2ZXNlcnZpY2VzIn0.tV9NHN-NsfX3_62J8QCqBAT4eMKMu-ixOk5G9NdhLUKyr0DZVF2g0WHEyrmvr796sm7wrVxY40-BCpmhxMtRoQ";
  url = "https://canadacentral.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1"
  // url = "https://eastus.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1"
  headers = new HttpHeaders()
  .set('Content-Type', 'audio/wav')
  .set('Ocp-Apim-Subscription-Key', '35db1fb4c14f4b4faec697d45be77a75')
  .set('Authorization', `Bearer ${this.auth_token}`)
  constructor(private http: HttpClient) { }

  submitVocalFile(audioFile: any): Observable<any> {
    return this.http.post(this.url + '?language=en-CA', audioFile, {
      headers: this.headers,
      responseType: 'json'
    });
  }

}
