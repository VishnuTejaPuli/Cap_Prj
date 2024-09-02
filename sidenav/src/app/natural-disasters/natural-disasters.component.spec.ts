import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturalDisastersComponent } from './natural-disasters.component';

describe('NaturalDisastersComponent', () => {
  let component: NaturalDisastersComponent;
  let fixture: ComponentFixture<NaturalDisastersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaturalDisastersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaturalDisastersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
