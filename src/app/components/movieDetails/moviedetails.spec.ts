import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieDetails } from './moviedetails';

describe('Details', () => {
  let component: MovieDetails;
  let fixture: ComponentFixture<MovieDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
