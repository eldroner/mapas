import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotoneraAdivinanzaComponent } from './botonera-adivinanza.component';

describe('BotoneraAdivinanzaComponent', () => {
  let component: BotoneraAdivinanzaComponent;
  let fixture: ComponentFixture<BotoneraAdivinanzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotoneraAdivinanzaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotoneraAdivinanzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
