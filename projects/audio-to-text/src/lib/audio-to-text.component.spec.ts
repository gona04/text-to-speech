import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioToTextComponent } from './audio-to-text.component';

describe('AudioToTextComponent', () => {
  let component: AudioToTextComponent;
  let fixture: ComponentFixture<AudioToTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioToTextComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AudioToTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
