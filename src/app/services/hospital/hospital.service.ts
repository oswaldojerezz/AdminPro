import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Hospital } from '../../models/hospital.model';


import swal from 'sweetalert';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string;
  usuario: Usuario;

  constructor(
    public http: HttpClient,
    // tslint:disable-next-line:variable-name
    public _subirArchivoService: SubirArchivoService
  ) { this.cargarStorage(); }

  cargarStorage() {
    if (sessionStorage.getItem('token')) {
      this.token = sessionStorage.getItem('token');
      this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  crearHospital(nombre: string) {
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.token;

    return this.http.post(url, {nombre}).pipe(map((resp: any) => {
      swal('Hospital Creado', nombre , 'success');
      return resp.hospital;
    }));
  }

  cargarHospitales() {
    const url = URL_SERVICIOS + '/hospital';

    return this.http.get(url);
  }

  obtenerHospital( id: string ) {
    const url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).pipe(map( (resp: any) => resp.hospital ));
  }

  borrarHospital( id: string ) {
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url).pipe(map( resp => {
      swal('Hospital Borrado', 'El Hospital a sido eliminado Correctamente', 'success'); return true;
    }));
  }

  buscarHospital( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url ).pipe(
      map( (resp: any) => resp.hospitales )
    )
    ;

  }

  actualizarHospital(hospital: Hospital) {
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;
    return this.http.put(url, hospital).pipe(map( (resp: any) => {


      swal('Hospital Actualizado', hospital.nombre, 'success');

      return true;

    } ));

  }

}
