import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesCreateComponent } from './heroes-create.component';

describe('HeroesCreateComponent', () => {
  let component: HeroesCreateComponent;
  let fixture: ComponentFixture<HeroesCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroesCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
