import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  
  it('Debe existir el AppComponent', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance
    expect(app).toBeTruthy(); //TODO: ✔
  });

  it('Debe retornar formulario invalido', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance
    fixture.detectChanges() 

    const email = app.login.controls['email']
    email.setValue('leker33@gmail.com')

    expect(app.login.invalid).toBeTrue(); 
  });

  it('Debe retornar formulario valido', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance
    fixture.detectChanges()

    let email = app.login.controls['email']
    let password = app.login.controls['password']
    let result = app.login.controls['result']

    email.setValue('leker33@gmail.com')
    password.setValue('123456')
    result.setValue('1')


    expect(app.login.invalid).toBeFalse();
  });

  it(`Debe actulizar datos de usuario`, () => {
       const fixture = TestBed.createComponent(AppComponent);
       const app = fixture.componentInstance;
       fixture.detectChanges()
  
       let email = app.login.controls['email']
       let password = app.login.controls['password']
  
       email.setValue('leker33@gmail.com')
       password.setValue('123456')
  
       const btnElement = fixture.debugElement.query(By.css('button.btn'))
       btnElement.nativeElement.click()
       const testData = { user: 1 }
       expect(app.isCheck).toEqual(testData)
     });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
