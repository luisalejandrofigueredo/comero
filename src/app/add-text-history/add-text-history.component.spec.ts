import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTextHistoryComponent } from './add-text-history.component';

describe('AddTextHistoryComponent', () => {
  let component: AddTextHistoryComponent;
  let fixture: ComponentFixture<AddTextHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTextHistoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTextHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
