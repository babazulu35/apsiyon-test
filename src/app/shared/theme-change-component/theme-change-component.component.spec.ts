import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeChangeComponentComponent } from './theme-change-component.component';

describe('ThemeChangeComponentComponent', () => {
  let component: ThemeChangeComponentComponent;
  let fixture: ComponentFixture<ThemeChangeComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemeChangeComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeChangeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
