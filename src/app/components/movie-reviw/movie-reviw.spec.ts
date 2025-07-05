import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieReviw } from './movie-reviw';

describe('MovieReviw', () => {
  let component: MovieReviw;
  let fixture: ComponentFixture<MovieReviw>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieReviw]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieReviw);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
