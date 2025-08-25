import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VesselModalComponent } from './vessel-modal.component';

describe('VesselModalComponent', () => {
  let component: VesselModalComponent;
  let fixture: ComponentFixture<VesselModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VesselModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VesselModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
