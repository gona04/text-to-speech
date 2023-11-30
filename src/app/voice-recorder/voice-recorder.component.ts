import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VoiceRecognitionServiceService } from '../voice-recognition-service.service';
import { VoiceRecorderService } from '../voice-recorder.service';

@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
  styleUrls: ['./voice-recorder.component.css']
})
export class VoiceRecorderComponent implements OnInit {

  displayText: string = "";
  isLive!: boolean;
  constructor(public _voiceRecognitionService: VoiceRecognitionServiceService, private cdr: ChangeDetectorRef,
    private _voiceService: VoiceRecorderService) {
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

  uploadAudio(audioUploaded: any) {
    console.log(audioUploaded);

    let files: FileList = audioUploaded.target.files;
    let file : File = files[0];
    this._voiceService.submitVocalFile(file).subscribe(result => {
      // console.log(result);
      this.displayText = result.DisplayText;
      console.log(this.displayText);
    })
  }

  speekLive(value: boolean) {
    this.isLive = value;
  }
}
