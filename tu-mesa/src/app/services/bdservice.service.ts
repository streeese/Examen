import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Reserva } from './reserva';

@Injectable({
  providedIn: 'root'
})
export class BdserviceService {
  modificarReservas(id_reserva: string, nombre_titular: string, correo_titular: string, hora: string, dia: string) {
    throw new Error('Method not implemented.');
  }

  // variable para manipular la conexion a la base de datos
  public database!: SQLiteObject;
  //variable para la sentencia de creación de tabla
  tablaReserva: string = "CREATE TABLE IF NOT EXISTS reserva(id_reserva INTEGER PRIMARY KEY autoincrement, nombre_titular TEXT NOT NULL, correo_titular VARCHAR(25) NOT NULL, hora VARCHAR(20) NOT NULL, dia TEXT NOT NULL);";
  //variable para la sentencia de registros por defecto en la tabla
  registroReserva: string = "INSERT or IGNORE INTO reserva(id_reserva,nombre_titular,correo_titular,hora) VALUES (1,'Maria Torres','mariat@gmail.com', 14:30, Jueves 1 de Julio);";
  //observable para manipular todos los registros de la tabla reserva
  listaReservas = new BehaviorSubject([]);
  //observable para manipular si la BD esta lista  o no para su manipulación
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private platform: Platform, private toastController: ToastController, private alertController: AlertController) { 
    this.crearBD();
  }


  async presentToast(msj: string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 3000,
      icon: 'globe'
    });


    await toast.present();
  }


  dbState() {
    return this.isDBReady.asObservable();
  }


  fetchReservas(): Observable<Reserva[]> {
    return this.listaReservas.asObservable();
  }


  crearBD() {
    //verificamos que la plataforma este lista
    this.platform.ready().then(() => {
      //creamos la BD
      this.sqlite.create({
        name: 'bdreservas.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        //guardamos la conexion a la BD en la variable propia
        this.database = db;
        //llamar a la funcion para crear las tablas
        this.crearTablas();
      }).catch(e => {
        //muestro el mensaje de error en caso de ocurrir alguno
        this.presentToast("Error BD:" + e);
      })
    })
  }

  async crearTablas() {
    try {
      //ejecuto mis tablas
      await this.database.executeSql(this.tablaReserva, []);
      //ejecuto mis registros
      await this.database.executeSql(this.registroReserva, []);
      //cargar todos los registros de la tabla en el observable
      this.buscarReservas();
      //actualizar el status de la BD
      this.isDBReady.next(true);


    } catch (e) {
      this.presentToast("Error Tablas: " + e);
    }
  }

  buscarReservas() {
    //retorno la ejecución del select
    return this.database.executeSql('SELECT * FROM reserva', []).then(res => {
      //creo mi lista de objetos de noticias vacio
      let items: Reserva[] = [];
      //si cuento mas de 0 filas en el resultSet entonces agrego los registros al items
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_reserva: res.rows.item(i).id_reserva,
            nombre_titular: res.rows.item(i).nombre_titular,
            correo_titular: res.rows.item(i).correo_titular,
            hora: res.rows.item(i).hora,
            dia: res.rows.item(i).dia
          })
        }
      }
      //actualizamos el observable de las noticias
      this.listaReservas.next(items as any);
    })
  }


  insertarReservas(nombre_titular: any, correo_titular: any, hora: any, dia: any){
    let data = [nombre_titular,correo_titular,hora,dia];
    return this.database.executeSql('INSERT INTO reserva(nombre_titular,correo_titular,hora,dia) VALUES (?,?,?,?)',data).then(res=>{
      this.buscarReservas();
    });


  }


  modificarNoticias(id_reserva: any,nombre_titular: any, correo_titular: any, hora: any, dia: any){
    let data = [id_reserva,nombre_titular,correo_titular,hora,dia];
    return this.database.executeSql('UPDATE reserva SET nombre_titular = ?, correo_titular, hora = ?, dia = ? WHERE id_reserva = ?',data).then(data2=>{
      this.buscarReservas();
    })
  }


  eliminarReservas(id: any){
    return this.database.executeSql('DELETE FROM reserva WHERE id_reserva = ?',[id]).then(a=>{
      this.buscarReservas();
    })
  }

  async presentAlert(msj:string) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msj,
      buttons: ['OK'],
    });


    await alert.present();
  }
}