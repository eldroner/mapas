import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GentiliciosEspanaComponent } from './gentilicios-espana.component';

describe('GentiliciosEspanaComponent', () => {
  let component: GentiliciosEspanaComponent;
  let fixture: ComponentFixture<GentiliciosEspanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GentiliciosEspanaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GentiliciosEspanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
