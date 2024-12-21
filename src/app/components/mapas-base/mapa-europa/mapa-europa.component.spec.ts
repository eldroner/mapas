import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaEuropaComponent } from './mapa-europa.component';

describe('MapaEuropaComponent', () => {
  let component: MapaEuropaComponent;
  let fixture: ComponentFixture<MapaEuropaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaEuropaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaEuropaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
