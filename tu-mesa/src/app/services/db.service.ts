import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite-porter';

@Injectable({
  providedIn: 'root'
})
export class DbService {

  constructor() { }
}
