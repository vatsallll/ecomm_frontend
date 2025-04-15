import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeusernameComponent } from './changeusername.component';

describe('ChangeusernameComponent', () => {
  let component: ChangeusernameComponent;
  let fixture: ComponentFixture<ChangeusernameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeusernameComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChangeusernameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
