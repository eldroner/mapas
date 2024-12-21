import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaAfricaComponent } from './mapa-africa.component';

describe('MapaAfricaComponent', () => {
  let component: MapaAfricaComponent;
  let fixture: ComponentFixture<MapaAfricaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaAfricaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaAfricaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
