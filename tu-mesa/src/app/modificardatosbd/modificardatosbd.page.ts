import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BdserviceService } from 'src/app/services/bdservice.service';

@Component({
  selector: 'app-modificardatosbd',
  templateUrl: './modificardatosbd.page.html',
  styleUrls: ['./modificardatosbd.page.scss'],
})
export class ModificardatosbdPage implements OnInit {
      id_reserva: "";
      nombre_titular: "";
      correo_titular: "";
      hora: "";
      dia: "";

      constructor(private router: Router, private activedRouter: ActivatedRoute, private servicio: BdserviceService) { 
        this.activedRouter.queryParams.subscribe(param=>{
          if(this.router.getCurrentNavigation()?.extras.state){
            this.id_reserva = this.router.getCurrentNavigation()?.extras?.state?.['idEnviado'];
            this.nombre_titular = this.router.getCurrentNavigation()?.extras?.state?.['nombreEnviado'];
            this.correo_titular = this.router.getCurrentNavigation()?.extras?.state?.['correoEnviado'];
            this.hora = this.router.getCurrentNavigation()?.extras?.state?.['horaEnviado'];
            this.dia = this.router.getCurrentNavigation()?.extras?.state?.['diaEnviado'];
          }
        })
      }
    
    
      ngOnInit() {
      }
      editar(){
        this.servicio.modificarReservas(this.id_reserva,this.nombre_titular,this.correo_titular,this.hora,this.dia);
        this.servicio.presentToast("Reserva Actualizada");
        this.router.navigate(['/listar']);
      }
    
    
    }
     


