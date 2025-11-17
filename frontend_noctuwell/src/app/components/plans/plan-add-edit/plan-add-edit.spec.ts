import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanAddEdit } from './plan-add-edit';

describe('PlanAddEdit', () => {
  let component: PlanAddEdit;
  let fixture: ComponentFixture<PlanAddEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlanAddEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanAddEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
