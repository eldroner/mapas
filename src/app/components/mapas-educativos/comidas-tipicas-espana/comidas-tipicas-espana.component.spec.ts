import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComidasTipicasEspanaComponent } from './comidas-tipicas-espana.component';

describe('ComidasTipicasEspanaComponent', () => {
  let component: ComidasTipicasEspanaComponent;
  let fixture: ComponentFixture<ComidasTipicasEspanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComidasTipicasEspanaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComidasTipicasEspanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
