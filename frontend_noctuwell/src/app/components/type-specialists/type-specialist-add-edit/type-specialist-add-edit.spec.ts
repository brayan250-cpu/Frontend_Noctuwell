import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSpecialistAddEdit } from './type-specialist-add-edit';

describe('TypeSpecialistAddEdit', () => {
  let component: TypeSpecialistAddEdit;
  let fixture: ComponentFixture<TypeSpecialistAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeSpecialistAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeSpecialistAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
