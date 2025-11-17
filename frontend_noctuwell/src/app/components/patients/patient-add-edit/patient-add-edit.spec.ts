import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientAddEdit } from './patient-add-edit';

describe('PatientAddEdit', () => {
  let component: PatientAddEdit;
  let fixture: ComponentFixture<PatientAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
