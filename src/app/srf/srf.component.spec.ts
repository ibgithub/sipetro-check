import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SrfComponent } from './srf.component';

describe('SrfComponent', () => {
  let component: SrfComponent;
  let fixture: ComponentFixture<SrfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SrfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
