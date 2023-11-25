import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YesNOComponent } from './yes-no.component';

describe('YesNOComponent', () => {
  let component: YesNOComponent;
  let fixture: ComponentFixture<YesNOComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YesNOComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(YesNOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
