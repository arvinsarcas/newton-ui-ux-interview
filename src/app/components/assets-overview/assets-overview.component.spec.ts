import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetsOverviewComponent } from './assets-overview.component';

describe('AssetsOverviewComponent', () => {
  let component: AssetsOverviewComponent;
  let fixture: ComponentFixture<AssetsOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssetsOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssetsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
