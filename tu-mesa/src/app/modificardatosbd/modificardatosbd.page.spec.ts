import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificardatosbdPage } from './modificardatosbd.page';

describe('ModificardatosbdPage', () => {
  let component: ModificardatosbdPage;
  let fixture: ComponentFixture<ModificardatosbdPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(ModificardatosbdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
