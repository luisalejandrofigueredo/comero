import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComPythonComponent } from './com-python.component';

describe('ComPythonComponent', () => {
  let component: ComPythonComponent;
  let fixture: ComponentFixture<ComPythonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComPythonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComPythonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
