import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalapPage } from './balap.page';

describe('BalapPage', () => {
  let component: BalapPage;
  let fixture: ComponentFixture<BalapPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(BalapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
