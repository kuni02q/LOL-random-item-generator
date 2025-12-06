import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedBuildsComponent } from './saved-builds.component';

describe('SavedBuildsComponent', () => {
  let component: SavedBuildsComponent;
  let fixture: ComponentFixture<SavedBuildsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SavedBuildsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SavedBuildsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
