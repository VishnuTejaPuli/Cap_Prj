import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WomensafetyComponent } from './womensafety.component';

describe('WomensafetyComponent', () => {
  let component: WomensafetyComponent;
  let fixture: ComponentFixture<WomensafetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WomensafetyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WomensafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
