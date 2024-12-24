import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotoneraProvinciasComponent } from './botonera-provincias.component';

describe('BotoneraProvinciasComponent', () => {
  let component: BotoneraProvinciasComponent;
  let fixture: ComponentFixture<BotoneraProvinciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotoneraProvinciasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotoneraProvinciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
