import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistAddEdit } from './specialist-add-edit';

describe('SpecialistAddEdit', () => {
  let component: SpecialistAddEdit;
  let fixture: ComponentFixture<SpecialistAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialistAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialistAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
