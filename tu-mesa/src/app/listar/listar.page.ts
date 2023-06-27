import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  arregloReservas: any = [
    {
      id_reserva: '',
      nombre_tirular: '',
      correo_titular: '',
      hora: '',
      dia:''
    }
  ]

  constructor(private router: Router, private servicioBD: BdserviceService) { }

  ngOnInit() {
    this.servicioBD.dbState().subscribe(res=>{
      if(res){
        this.servicioBD.fetchReservas().subscribe(item=>{
          this.arregloReservas = item;
        })
      }
    })
  }

  obtenerTexto(Sevent: any){
    const valor = Sevent.target.value;
    console.log("Texto: " + valor);
  }

  modificar(x:any){
    modificar(x:any){
      let navigationExtras: NavigationExtras = {
        state: {
          id_reservaEnviado: x.id_reserva,
          nombre_titularEnviado: x.nombre_titular,
          correo_titular: x.correo_titular,
          horaEnviado: x.hora,
          diaEnviado: x.dia
        }  
      }
      this.router.navigate(['/modificar'], navigationExtras);
    }
  eliminar(x:any){
    this.servicioBD.eliminarReservas(x.id);
    this.servicioBD.presentToast("Reserva Eliminada");

  }
}

}
