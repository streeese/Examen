import { TestBed } from '@angular/core/testing';

import { ApiserviceService } from './apiservice.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { By } from '@angular/platform-browser';

describe('ApiserviceService', () => {
  let service: ApiserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient],
    });
    service = TestBed.inject(ApiserviceService);
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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
