import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { AudioLibraryService } from './audio-library.service';

@Component({
  selector: 'lib-audio-library',
  templateUrl: './audio-library.component.html',
  styleUrls: ['./audio-library.component.css']
})
export class AudioLibraryComponent implements OnInit {

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

  constructor(public cdr: ChangeDetectorRef,
    public _audioLibraryService: AudioLibraryService) {
    this._audioLibraryService.init();
  }

  ngOnInit(): void {
  }

  startService() {
    this._audioLibraryService.start();
  }

  stopService() {
    this._audioLibraryService.stop();
    this.cdr.detectChanges();
  }

  uploadAudio(audioUploaded: any) {
    alert("Audio uploaded")
    console.log(audioUploaded);

    let files: FileList = audioUploaded.target.files;
    let file : File = files[0];
    this._audioLibraryService.submitVocalFile(file).subscribe((result:any) => {
      this.displayText = result.DisplayText;
      console.log(this.displayText);
    })
  }

  speekLive(value: boolean) {
    console.log(value);
    this.isLive = value;
  }

  save() {
    //this._emotionalAnalyserService.sendTextForAnalysis(this._voiceRecognitionService.text)
  }

}
