import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NdFormComponent } from './nd-form.component';

describe('NdFormComponent', () => {
  let component: NdFormComponent;
  let fixture: ComponentFixture<NdFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NdFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NdFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
