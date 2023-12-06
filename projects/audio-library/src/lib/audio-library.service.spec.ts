import { TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';

import { AudioLibraryService } from './audio-library.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule } from '@angular/forms';
import { AudioLibraryComponent } from './audio-library.component';

describe('AudioLibraryService', () => {
  let service: AudioLibraryService;
  let component: AudioLibraryComponent; // Declare component here

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [AudioLibraryComponent],
      providers: [AudioLibraryService],
      imports: [HttpClientModule, AngularEditorModule, FormsModule],
    }).compileComponents();
  }));

  beforeEach(() => {
    let fixture = TestBed.createComponent(AudioLibraryComponent);
    component = fixture.componentInstance; // Assign the component instance
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start voice recognition service', () => {
    spyOn(component._audioLibraryService, 'start');
    component.startService();
    expect(component._audioLibraryService.start).toHaveBeenCalled();
  });

  it('should stop voice recognition service and detect changes', () => {
    spyOn(component._audioLibraryService, 'stop');
    spyOn(component.cdr, 'detectChanges');
    component.stopService();
    expect(component._audioLibraryService.stop).toHaveBeenCalled();
    expect(component.cdr.detectChanges).toHaveBeenCalled();
  });

  it('should upload WAV audio file and update display text', (done: DoneFn) => {
    const wavFile = new File([''], 'test-audio-file.wav', { type: 'audio/wav' });
    const audioUploaded = {
      target: {
        files: {
          0: wavFile,
          length: 1,
          item: (index: number) => wavFile,
        },
      },
    };

    spyOn(component._audioLibraryService, 'submitVocalFile').and.returnValue(of({ DisplayText: 'Test Display Text' }));
    spyOn(component._audioLibraryService, 'stop');
    spyOn(component.cdr, 'detectChanges');

    component.uploadAudio(audioUploaded);

    setTimeout(() => {
      expect(component._audioLibraryService.submitVocalFile).toHaveBeenCalledWith(jasmine.any(File));
      expect(component.displayText).toEqual('Test Display Text');
      expect(component._audioLibraryService.stop).not.toHaveBeenCalled();
      expect(component.cdr.detectChanges).not.toHaveBeenCalled();
      done();
    });
  });
});
