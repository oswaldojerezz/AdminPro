import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;

  totalRegistros: number = 0;
  cargando: boolean = true;


  constructor(
    // tslint:disable-next-line:variable-name
    public _hospitalService: HospitalService,
    // tslint:disable-next-line:variable-name
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe( () => this.cargarHospitales() );
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal( 'hospitales' , id);
  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales().subscribe( (resp: any) => {
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });
  }

  buscarHospitales( termino: string ) {

    if (termino.length <= 2) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;

    this._hospitalService.buscarHospital( termino )
    .subscribe( (hospitales: Hospital[] ) => {
      this.hospitales = hospitales;
      this.cargando = false;
    })
    ;
  }

  borrarHospitales(hospital: Hospital) {

    swal({
      title: 'Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    }).then( borrar => {
      if (borrar) {
        this._hospitalService.borrarHospital(hospital._id).subscribe( resp => {  this.desde = 0; this.cargarHospitales(); });
      }
    });
  }

  guardarHospitales(hospital: Hospital) {
    this._hospitalService.actualizarHospital( hospital ).subscribe();
  }

  intHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }).then( (nombre: string) => {
      if (!nombre || nombre.length === 0 ) {
        return ;
      }
      this._hospitalService.crearHospital(nombre).subscribe( () => this.cargarHospitales() );
    });
  }

}
