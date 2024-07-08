import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnesimesComponent } from './onesimes.component';

describe('OnesimesComponent', () => {
  let component: OnesimesComponent;
  let fixture: ComponentFixture<OnesimesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnesimesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnesimesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
