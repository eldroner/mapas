import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaAsiaComponent } from './mapa-asia.component';

describe('MapaAsiaComponent', () => {
  let component: MapaAsiaComponent;
  let fixture: ComponentFixture<MapaAsiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaAsiaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaAsiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
