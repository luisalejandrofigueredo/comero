import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfSerialsComponent } from './conf-serials.component';

describe('ConfSerialsComponent', () => {
  let component: ConfSerialsComponent;
  let fixture: ComponentFixture<ConfSerialsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfSerialsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfSerialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
