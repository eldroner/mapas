import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContadorErroresComponent } from './contador-errores.component';

describe('ContadorErroresComponent', () => {
  let component: ContadorErroresComponent;
  let fixture: ComponentFixture<ContadorErroresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContadorErroresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContadorErroresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
