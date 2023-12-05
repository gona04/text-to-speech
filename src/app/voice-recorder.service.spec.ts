// Import required modules and services for integration testing
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { VoiceRecorderService } from './voice-recorder.service';

describe('VoiceRecorderService (Integration)', () => {
  let service: VoiceRecorderService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VoiceRecorderService],
    });

    service = TestBed.inject(VoiceRecorderService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should submit vocal file successfully', (done: DoneFn) => {
    const dummyAudioFile = {}; // Provide a dummy audio file for testing

    service.submitVocalFile(dummyAudioFile).subscribe((response) => {
      expect(response).toBeTruthy();
      done();
    });

    const req = httpTestingController.expectOne(`${service.url}?language=en-CA`);

    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('audio/wav');
    expect(req.request.headers.get('Ocp-Apim-Subscription-Key')).toBe('35db1fb4c14f4b4faec697d45be77a75');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${service.auth_token}`);

    req.flush({});
  });
});
