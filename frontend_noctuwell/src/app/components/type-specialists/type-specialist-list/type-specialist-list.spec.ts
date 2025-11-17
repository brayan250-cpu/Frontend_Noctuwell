import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeSpecialistList } from './type-specialist-list';

describe('TypeSpecialistList', () => {
  let component: TypeSpecialistList;
  let fixture: ComponentFixture<TypeSpecialistList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeSpecialistList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeSpecialistList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
