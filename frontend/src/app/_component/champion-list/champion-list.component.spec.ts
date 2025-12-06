import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChampionListComponent } from './champion-list.component';

describe('ChampionListComponent', () => {
  let component: ChampionListComponent;
  let fixture: ComponentFixture<ChampionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChampionListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChampionListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
