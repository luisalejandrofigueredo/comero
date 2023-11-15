import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeEstateComponent } from './change-estate.component';

describe('ChangeEstateComponent', () => {
  let component: ChangeEstateComponent;
  let fixture: ComponentFixture<ChangeEstateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChangeEstateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeEstateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
