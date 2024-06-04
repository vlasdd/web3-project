import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonatesComponent } from './donates.component';

describe('DonatesComponent', () => {
  let component: DonatesComponent;
  let fixture: ComponentFixture<DonatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DonatesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DonatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
