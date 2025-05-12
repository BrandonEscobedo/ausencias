import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiberadaComponent } from './liberada.component';

describe('LiberadaComponent', () => {
  let component: LiberadaComponent;
  let fixture: ComponentFixture<LiberadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LiberadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiberadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
