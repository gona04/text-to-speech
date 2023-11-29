import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VoiceRecognitionServiceService } from '../voice-recognition-service.service';

@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
  styleUrls: ['./voice-recorder.component.css']
})
export class VoiceRecorderComponent implements OnInit {

  text: string = "";

  constructor(public _voiceRecognitionService: VoiceRecognitionServiceService, private cdr: ChangeDetectorRef) {
    this._voiceRecognitionService.init();
  }

  ngOnInit(): void {
  }

  startService() {
    this._voiceRecognitionService.start();
  }

  stopService() {
    this._voiceRecognitionService.stop();
    this.cdr.detectChanges();
  }
}
