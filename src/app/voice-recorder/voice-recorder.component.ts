import { Component, OnInit } from '@angular/core';
// import { AudioLibraryComponent } from 'projects/audio-library/src/public-api';

@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
  // styleUrls: ['./voice-recorder.component.css']
})
export class VoiceRecorderComponent implements OnInit {

  constructor() {

  }

  ngOnInit(): void {

  }

  save() {
    // this._emotionalAnalyserService.sendTextForAnalysis(this._voiceRecognitionService.text)
  }
}
