import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaEspanaProvinciasComponent } from './mapa-espana-provincias.component';

describe('MapaEspanaProvinciasComponent', () => {
  let component: MapaEspanaProvinciasComponent;
  let fixture: ComponentFixture<MapaEspanaProvinciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaEspanaProvinciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaEspanaProvinciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
