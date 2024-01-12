/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestPythonComponent } from './test-python.component';

describe('TestPythonComponent', () => {
  let component: TestPythonComponent;
  let fixture: ComponentFixture<TestPythonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestPythonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestPythonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
