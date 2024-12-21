import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaMundoComponent } from './mapa-mundo.component';

describe('MapaMundoComponent', () => {
  let component: MapaMundoComponent;
  let fixture: ComponentFixture<MapaMundoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapaMundoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapaMundoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
