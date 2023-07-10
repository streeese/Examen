import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificardatosbdPage } from './modificardatosbd.page';
import { SQLite } from '@ionic-native/sqlite';
import { ActivatedRoute } from '@angular/router';

describe('ModificardatosbdPage', () => {
  let component: ModificardatosbdPage;
  let fixture: ComponentFixture<ModificardatosbdPage>;

  const fakeActivatedRoute = {
    snapshot: { data: {}}
  } as ActivatedRoute;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute},SQLite],
    });
    fixture = TestBed.createComponent(ModificardatosbdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
