import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class AudioLibraryService {
  // Dotnet configuration
  private dotnetURL = "http://localhost:5103/api/ConvertedText";

  // FOR AZURE SPEECH TO TEXT AUDIO FILE UPLOAD
  private auth_token = "your_bearer_token"; // Replace with your actual token
  private url = "https://canadacentral.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1";
  private headers = new HttpHeaders()
    .set('Content-Type', 'audio/wav')
    .set('Ocp-Apim-Subscription-Key', '35db1fb4c14f4b4faec697d45be77a75')
    .set('Authorization', `Bearer ${this.auth_token}`);

  // FOR WEB SPEECH API LIVE SPEECH TO TEXT
  private recognition = new webkitSpeechRecognition();
  private isStoppedSpeechRecord = true;
  public text = "";
  private tempWords: any;

  // Sentiment Analyzer API
  private urlSentimentAnalyzerAPI = "https://emotion-analysis-api.cognitiveservices.azure.com/text/analytics/v3.1/sentiment?emotion-analysis-api=true";
  private headersentimentAnalyzerAPI = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Ocp-Apim-Subscription-Key', '172a80032d1c47599854ca321e141d13')
    .set('Ocp-Apim-Subscription-Region', 'centralus');

    tobeEdited: BehaviorSubject<Object> = new BehaviorSubject<Object>({});
  constructor(private http: HttpClient) {
    // FOR live text to speech
    this.init();
  }

  // POST call for the AZURE API
  submitVocalFile(audioFile: any): Observable<any> {
    return this.http.post(`${this.url}?language=en-CA`, audioFile, {
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

  // To start receiving audio from the user
  start() {
    this.isStoppedSpeechRecord = false;
    this.recognition.interimResults = false;
    this.recognition.continuous = true;
    this.recognition.start();
    this.recognition.addEventListener("end", (condition: any) => {
      if (this.isStoppedSpeechRecord) {
        this.recognition.stop();
      } else {
        this.wordConcat();
        this.recognition.start();
      }
    });
  }

  // This contains the text that the user will get after conversion
  wordConcat() {
    this.text = this.tempWords + ". ";
  }

  // This will be called when the user wants to stop the conversion of speech to text
  stop() {
    this.isStoppedSpeechRecord = true;
    this.recognition.stop();
  }

  // Added dotnet backend
  postConvertedText(text: string): Observable<any> {
    const body = {
      "text": text,
      "userName": "Goonja",
      "createdAt": new Date().toISOString()
    };
    console.log("dotnet call made");
    console.dir(body);
    return this.http.post(this.dotnetURL, body);
  }

  // FOR SENTIMENTAL API
  sendTextForAnalysis(text: string, textId: any) {
    const document = [{ id: '1', text: text, language: 'en' }];
    this.http.post(this.urlSentimentAnalyzerAPI, { documents: document }, { headers: this.headersentimentAnalyzerAPI, responseType: 'json' }).subscribe((result: any) => {
      console.log(result);

      const sentimentObj = {
        "positive": result.documents[0].confidenceScores.positive * 100,
        "negative": result.documents[0].confidenceScores.negative * 100,
        "neutral": result.documents[0].confidenceScores.neutral * 100,
        "sentiment": result.documents[0].sentiment,
        "convertedTextId": textId,
      };

      this.postSentimentalAnalyserDb(sentimentObj);
    });
  }

  postSentimentalAnalyserDb(sentimentObj: any) {
    console.log(sentimentObj);

    this.http.post("http://localhost:5103/api/SentimentAnalyser", sentimentObj).subscribe(result => {
      console.log(result);
    });
  }

  sendDataTobeEdited(data: any) {
   this.tobeEdited.next(data);
  }

  getTobeEdited() {
    return this.tobeEdited.asObservable();
  }
 }
