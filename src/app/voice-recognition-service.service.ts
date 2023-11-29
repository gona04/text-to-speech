import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionServiceService {
  recognition = new webkitSpeechRecognition();
  isRecognitionRunning = false;
  isStoppedSpeechRecord = false;
  public text = "";
  tempWords: any;
  private lastRecognitionEvent: any;

  constructor() {
    this.init();
  }

  init() {
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.addEventListener('result', (e: any) => {
      this.lastRecognitionEvent = e; // Store the event for later use
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

    this.recognition.addEventListener('end', () => {
      if (!this.isStoppedSpeechRecord) {
        this.startRecognition();
      }
    });
  }

  startRecognition() {
    if (!this.isRecognitionRunning) {
      this.isRecognitionRunning = true;
      this.isStoppedSpeechRecord = false;
      this.recognition.start();
    }
  }

  start() {
    this.isStoppedSpeechRecord = false;
    this.startRecognition();
  }

  wordConcat() {
    const currentTranscript = this.tempWords.trim();

    // Log the entire results object for further analysis
    console.log("Results object:", this.lastRecognitionEvent.results);

    // Check if the current transcript is different from the previous one
    if (currentTranscript !== "") {
      this.text += (this.text.length > 0 ? ' ' : '') + currentTranscript;
    }

    this.tempWords = "";
  }






  stop() {
    this.isStoppedSpeechRecord = true;
    this.isRecognitionRunning = false;
    this.recognition.stop();
    console.log("End speech from stop method");
  }
}
