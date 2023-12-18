import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIaTextComponent } from './add-ia-text.component';

describe('AddIaTextComponent', () => {
  let component: AddIaTextComponent;
  let fixture: ComponentFixture<AddIaTextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddIaTextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddIaTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
