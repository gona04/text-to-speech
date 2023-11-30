import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionServiceService {
  recognition = new webkitSpeechRecognition();
  isStoppedSpeechRecord = true;
  public text = "";
  tempWords: any;

  constructor() {
    this.init();
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
      console.log(transcript);
      if (e.results[0].isFinal) {
        this.wordConcat();
      }
    });
  }



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

  wordConcat() {
  this.text = this.tempWords + ". ";
  }

  stop() {
    this.isStoppedSpeechRecord = true;
    this.recognition.stop();
    console.log("End speech from stop method");
  }
}
