import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvinciasEspanaComponent } from './provincias-espana.component';

describe('ProvinciasEspanaComponent', () => {
  let component: ProvinciasEspanaComponent;
  let fixture: ComponentFixture<ProvinciasEspanaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvinciasEspanaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvinciasEspanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
