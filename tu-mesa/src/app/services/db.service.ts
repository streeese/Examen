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
  private storage: SQLiteObject;
  usuarioList: any = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  
  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,

  ) {
    this.platform.ready().then(()=>{
      this.sqlite
      .create({
        name: 'data.db',
        location: 'default',
      })
      .then((db: SQLiteObject)=>{
        this.storage = db;
        this.getFakeData();
      });
    });
  }

// Retorna el estado de la base de datos
  dbState(){
    return this.isDbReady.asObservable();
  }

// Método que lee a los usuarios
  fetchUsuarios(): Observable<Usuario[]>{
    return this.usuarioList.asObservable();
  }
// 
  getFakeData(){
    this.httpClient
      .get('assets/base.sql', {responseType: 'text'})
      .subscribe((data) => {
        this.sqlPorter
          .importSqlToDb(this.storage, data)
          .then((_) => {
              this.getUsuarios();
              this.isDbReady.next(true);
          })
          .catch((error) => console.error(error));
      })
  }
//Método que trae a los usuarios - crea arreglo
  getUsuarios(){
      return this.storage
        .executeSql('SELECT * FROM usuario', [])
        .then((res) => {
          let items: Usuario[] = [];
          if (res.rows.length > 0){
            for (var i = 0; i < res.rows.length; i++){
              items.push({
                id: res.rows.item(i).id,
                nombre: res.rows.item(i).nombre,
                correo: res.rows.item(i).correo,
                passw: res.rows.item(i).passw,
              });
            }
          }
          this.usuarioList.next(items); //El resultado se almacena
        });
  }

  addUsuario(nombre: any, correo: any, passw: any){
    let data = [nombre, correo, passw];
    return this.storage(
      'INSERT INTO usuario (nombre, correo, passw) VALUES (?, ?, ?)', data
    )
    .then((res) => {
      this.getUsuarios(); //Actualiza 
    });
  }
//Usuario por id
  getUsuario(id: any){
    return this.storage
      .executeSql('SELECT * FROM usuario WHERE id = ?', [id])
      .then((res) => {
        return {
              id: res.rows.item(0).id,
              nombre: res.rows.item(0).nombre,
              correo: res.rows.item(0).correo,
              passw: res.rows.item(0).passw,
          };
        });       
  }

  updateUsuario(id: any, usuario: Usuario){
    let data = [usuario.nombre, usuario.correo, usuario.passw]; 
    return this.storage
      .executeSql('UPDATE usuario set nombre = ?, correo = ?, passw = ? WHERE id = $(id)', data)
      .then((res) => {
          this.getUsuarios(); //Actualiza 
        });           
  }
//Método para eliminar usuario por id
  deleteUsuario(id: any){
    return this.storage
      .executeSql('DELETE FROM usuario WHERE ID = ?', [id])
      .then((_) => {
          this.getUsuarios(); //Actualiza 
        });           
  }
}
