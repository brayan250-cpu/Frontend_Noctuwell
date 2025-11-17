import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentAddEdit } from './appointment-add-edit';

describe('AppointmentAddEdit', () => {
  let component: AppointmentAddEdit;
  let fixture: ComponentFixture<AppointmentAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
