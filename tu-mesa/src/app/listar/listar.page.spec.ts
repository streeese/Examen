import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarPage } from './listar.page';
import { SQLite } from '@ionic-native/sqlite';

describe('ListarPage', () => {
  let component: ListarPage;
  let fixture: ComponentFixture<ListarPage>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      providers: [SQLite],
    });
    fixture = TestBed.createComponent(ListarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
