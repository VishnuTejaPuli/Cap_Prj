import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildsafetyComponent } from './childsafety.component';

describe('ChildsafetyComponent', () => {
  let component: ChildsafetyComponent;
  let fixture: ComponentFixture<ChildsafetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChildsafetyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildsafetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
