import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmotionalAnalyserService {

  private url = "https://emotion-analysis-api.cognitiveservices.azure.com/text/analytics/v3.1/sentiment?emotion-analysis-api=true"
  private headers = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Ocp-Apim-Subscription-Key', '172a80032d1c47599854ca321e141d13')
    .set('Ocp-Apim-Subscription-Region', 'centralus');

  constructor(private http: HttpClient) { }

  sendTextForAnalysis(text: string) {
    const document = [{ id: '1', text: text, language: 'en' }];
    this.http.post(this.url, {documents: document}, { headers: this.headers, responseType: 'json' }).subscribe(result => {
    });
  }

  // savingDataAPI(text: string) {
  //  let body =  {
  //     "text": text,
  //     "userName": "Goonja",
  //     "createdAt": new Date().toISOString()
  //   }
  //   let url = "http://localhost:5103/api/ConvertedText"
  //   return this.http.post(url, body)
  // }
}
