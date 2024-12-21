import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AntipodasComponent } from './antipodas.component';

describe('AntipodasComponent', () => {
  let component: AntipodasComponent;
  let fixture: ComponentFixture<AntipodasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntipodasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AntipodasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
