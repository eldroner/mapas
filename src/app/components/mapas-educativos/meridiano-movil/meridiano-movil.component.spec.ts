import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeridianoMovilComponent } from './meridiano-movil.component';

describe('MeridianoMovilComponent', () => {
  let component: MeridianoMovilComponent;
  let fixture: ComponentFixture<MeridianoMovilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MeridianoMovilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeridianoMovilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
