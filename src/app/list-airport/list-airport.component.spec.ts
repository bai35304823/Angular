import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAirportComponent } from './list-airport.component';

describe('ListAirportComponent', () => {
  let component: ListAirportComponent;
  let fixture: ComponentFixture<ListAirportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAirportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAirportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
