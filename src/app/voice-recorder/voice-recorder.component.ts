import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VoiceRecognitionServiceService } from '../voice-recognition-service.service';
import { VoiceRecorderService } from '../voice-recorder.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { EmotionalAnalyserService } from '../emotional-analyser.service';

@Component({
  selector: 'app-voice-recorder',
  templateUrl: './voice-recorder.component.html',
  styleUrls: ['./voice-recorder.component.css']
})
export class VoiceRecorderComponent implements OnInit {

  displayText: string = "";
  // editorText: any = '';
  isLive!: boolean;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Whatever you speak can be edited here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',

  };

  constructor(public _voiceRecognitionService: VoiceRecognitionServiceService, public cdr: ChangeDetectorRef,
    public _voiceService: VoiceRecorderService, public _emotionalAnalyserService: EmotionalAnalyserService) {
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

  save() {
    this._emotionalAnalyserService.sendTextForAnalysis(this._voiceRecognitionService.text)
  }
}
