import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerFinoComponent } from './banner-fino.component';

describe('BannerFinoComponent', () => {
  let component: BannerFinoComponent;
  let fixture: ComponentFixture<BannerFinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerFinoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BannerFinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
