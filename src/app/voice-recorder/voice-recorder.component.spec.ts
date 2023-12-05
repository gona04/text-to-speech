import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';
import { VoiceRecorderComponent } from './voice-recorder.component';
import { VoiceRecognitionServiceService } from '../voice-recognition-service.service';
import { VoiceRecorderService } from '../voice-recorder.service';

describe('VoiceRecorderComponent (Integration)', () => {
  let component: VoiceRecorderComponent;
  let fixture: ComponentFixture<VoiceRecorderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [VoiceRecorderComponent],
      providers: [
        VoiceRecognitionServiceService,
        VoiceRecorderService
      ],
      imports: [HttpClientModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoiceRecorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should start voice recognition service', () => {
    spyOn(component._voiceRecognitionService, 'start');
    component.startService();
    expect(component._voiceRecognitionService.start).toHaveBeenCalled();
  });

  it('should stop voice recognition service and detect changes', () => {
    spyOn(component._voiceRecognitionService, 'stop');
    spyOn(component.cdr, 'detectChanges');
    component.stopService();
    expect(component._voiceRecognitionService.stop).toHaveBeenCalled();
    expect(component.cdr.detectChanges).toHaveBeenCalled();
  });

  it('should upload WAV audio file and update display text', () => {
    const wavFile = new File([''], 'test-audio-file.wav', { type: 'audio/wav' });
    const audioUploaded = {
      target: {
        files: {
          0: wavFile,
          length: 1,
          item: (index: number) => wavFile
        }
      }
    };

    spyOn(component._voiceService, 'submitVocalFile').and.returnValue(of({ DisplayText: 'Test Display Text' }));
    spyOn(component._voiceRecognitionService, 'stop');
    spyOn(component.cdr, 'detectChanges');

    component.uploadAudio(audioUploaded);

    expect(component._voiceService.submitVocalFile).toHaveBeenCalledWith(jasmine.any(File));
    expect(component.displayText).toEqual('Test Display Text');
    expect(component._voiceRecognitionService.stop).not.toHaveBeenCalled();
    expect(component.cdr.detectChanges).not.toHaveBeenCalled();
  });
});
