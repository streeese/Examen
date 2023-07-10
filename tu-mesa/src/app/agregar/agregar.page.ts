import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
      id_reserva: "";
      nombre_titular: "Hola";
      correo_titular: "";
      hora: "";
      dia: "";


  constructor(public router:Router, private db: BdserviceService) { }


  ngOnInit() {
  }


  insertar(){
    this.db.insertarReservas(this.id_reserva,this.nombre_titular,this.correo_titular,this.hora,this.dia);
    this.db.presentToast("Reserva Agregada");
    this.router.navigate(['/listar']);
  }


}
