import { Component, OnInit } from '@angular/core';
import { VoiceRecorderService } from '../voice-recorder.service';

@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
  styleUrls: ['./voice-recorder.component.css']
})
export class VoiceRecorderComponent implements OnInit {

  displayText: string = "";
  constructor( private _voiceService: VoiceRecorderService) {
  }

  ngOnInit(): void {
  }

  startService() {
    console.log("Start called");
  }

  stopService() {
    console.log("Stop called");
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

}
