import { Component, OnInit } from '@angular/core';
import { VoiceRecorderService } from '../voice-recorder.service';
import { AzureAdDemoService } from '../azure-ad-demo.service';
import { VoiceRecognitionServiceService } from '../voice-recognition-service.service';

@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
  styleUrls: ['./voice-recorder.component.css']
})
export class VoiceRecorderComponent implements OnInit {

  text: string = "";
  constructor( public _voiceRecognitionService: VoiceRecognitionServiceService) {
    this._voiceRecognitionService.init()
  }

  ngOnInit(): void {
  }

  startService() {
    this._voiceRecognitionService.start();
  }

  stopService() {
    this._voiceRecognitionService.stop();
  }

  // uploadAudio(audioUploaded: any) {
  //   console.log(audioUploaded);

  //   let files: FileList = audioUploaded.target.files;
  //   let file : File = files[0];
  //   this._voiceService.submitVocalFile(file).subscribe(result => {
  //     // console.log(result);
  //     this.displayText = result.DisplayText;
  //     console.log(this.displayText);
  //   })
  // }

}
