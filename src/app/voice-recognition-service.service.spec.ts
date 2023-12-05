// Import required modules and services for integration testing
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { VoiceRecognitionServiceService } from './voice-recognition-service.service';

describe('VoiceRecognitionServiceService (Integration)', () => {
  let service: VoiceRecognitionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VoiceRecognitionServiceService]
    });
    service = TestBed.inject(VoiceRecognitionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start recognition', () => {
    spyOn(service.recognition, 'start');
    service.start();
    expect(service.isStoppedSpeechRecord).toBe(false);
    expect(service.recognition.start).toHaveBeenCalled();
  });

  it('should stop recognition', () => {
    spyOn(service.recognition, 'stop');
    service.stop();
    expect(service.isStoppedSpeechRecord).toBe(true);
    expect(service.recognition.stop).toHaveBeenCalled();
  });

});
