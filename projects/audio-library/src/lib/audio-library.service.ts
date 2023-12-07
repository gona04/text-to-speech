import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

declare var webkitSpeechRecognition: any;
@Injectable({
  providedIn: 'root'
})
export class AudioLibraryService {
  //Dotnet configuration
  dotnetURL = " http://localhost:5103/api/ConvertedText";

  //FOR AZURE SPEECH TO TEXT AUDIO FILE UPLOAD
  auth_token = "eyJhbGciOiJFUzI1NiIsImtpZCI6ImtleTEiLCJ0eXAiOiJKV1QifQ.eyJyZWdpb24iOiJjYW5hZGFjZW50cmFsIiwic3Vic2NyaXB0aW9uLWlkIjoiNzgwY2FmNmYzZDM2NDM0NjhlMTMxMjJmODkxNjU3YzciLCJwcm9kdWN0LWlkIjoiU3BlZWNoU2VydmljZXMuRjAiLCJjb2duaXRpdmUtc2VydmljZXMtZW5kcG9pbnQiOiJodHRwczovL2FwaS5jb2duaXRpdmUubWljcm9zb2Z0LmNvbS9pbnRlcm5hbC92MS4wLyIsImF6dXJlLXJlc291cmNlLWlkIjoiL3N1YnNjcmlwdGlvbnMvOGNiMzNkZGQtYzI2Ny00NzNkLWJhZTItNmZkNWI5ZDRjMTM0L3Jlc291cmNlR3JvdXBzL0RlZmF1bHRSZXNvdXJjZUdyb3VwLWNhbmFkYWVhc3QvcHJvdmlkZXJzL01pY3Jvc29mdC5Db2duaXRpdmVTZXJ2aWNlcy9hY2NvdW50cy90YWxrdG93cml0ZSIsInNjb3BlIjoic3BlZWNoc2VydmljZXMiLCJhdWQiOiJ1cm46bXMuc3BlZWNoc2VydmljZXMuY2FuYWRhY2VudHJhbCIsImV4cCI6MTcwMTgwNzE1MSwiaXNzIjoidXJuOm1zLmNvZ25pdGl2ZXNlcnZpY2VzIn0.tV9NHN-NsfX3_62J8QCqBAT4eMKMu-ixOk5G9NdhLUKyr0DZVF2g0WHEyrmvr796sm7wrVxY40-BCpmhxMtRoQ";
  url = "https://canadacentral.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1"
  headers = new HttpHeaders()
  .set('Content-Type', 'audio/wav')
  .set('Ocp-Apim-Subscription-Key', '35db1fb4c14f4b4faec697d45be77a75')
  .set('Authorization', `Bearer ${this.auth_token}`)

  //FOR WEB SPEECH API LIVE SPEECH TO TEXT
  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecord = true;
  public text = "";
  tempWords: any;

  constructor(private http: HttpClient) {
    //FOR live text to speech
    this.init();
   }
//POST call for the AZURE API
  submitVocalFile(audioFile: any): Observable<any> {
    return this.http.post(this.url + '?language=en-CA', audioFile, {
      headers: this.headers,
      responseType: 'json'
    });
  }

  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e: any) => {
      const transcript = Array.from(e.results)
        .map((result: any) => result[0])
        .map((result: any) => result.transcript)
        .join(' ');

      this.tempWords = transcript;
      if (e.results[0].isFinal) {
        this.wordConcat();
      }
    });
  }

  //To start reciving audio from the user
  start() {
    this.isStoppedSpeechRecord = false;
    this.recognition.interimResults = false;
    this.recognition.continuous = true;
    this.recognition.start();
    this.recognition.addEventListener("end", (condition: any) => {
      if(this.isStoppedSpeechRecord) {
        this.recognition.stop();
      } else {
        this.wordConcat();
        this.recognition.start();
      }
    })
  }

  //This contains the text that the user will get after conversion
  wordConcat() {
  this.text = this.tempWords + ". ";
  }

  //This will be called when the user wants to stop the conversion of speech to text
  stop() {
    this.isStoppedSpeechRecord = true;
    this.recognition.stop();
  }

  //Aded dotnet backend
  postConvertedText(text: string) {
    const body = {
      "text": text,
      "userName": "Goonja",
      "createdAt": new Date().toISOString()
    }
    console.log("dotnet call made");
    console.dir(body);
    return this.http.post(this.dotnetURL, body);
  }
}
