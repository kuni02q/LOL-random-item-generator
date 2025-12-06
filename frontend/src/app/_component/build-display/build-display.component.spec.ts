import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildDisplayComponent } from './build-display.component';

describe('BuildDisplayComponent', () => {
  let component: BuildDisplayComponent;
  let fixture: ComponentFixture<BuildDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuildDisplayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuildDisplayComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
