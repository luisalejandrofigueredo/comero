/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestSerialComponent } from './test-serial.component';

describe('TestSerialComponent', () => {
  let component: TestSerialComponent;
  let fixture: ComponentFixture<TestSerialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestSerialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSerialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
