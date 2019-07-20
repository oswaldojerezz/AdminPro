import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    // tslint:disable-next-line:variable-name
    public _subirArchivoService: SubirArchivoService,
    public router: Router
    ) { this.cargarStorage(); }

    renuevaToken() {
      let url = URL_SERVICIOS + '/login/renuevatoken';
      url += '?token' + this.token;

      return this.http.get(url).pipe(map( (resp: any) => {
        this.token = resp.token;
        sessionStorage.setItem('token', this.token);
        return true;
      }),
      catchError(err =>
        of([
          console.log('HTTP Error', err.status),
          swal(
           'No se pudo revonar token',
            err.error.mensaje,
            'error'
           ),
           this.logout()
         ])
      ));
    }


    // *******************************************
    //               LOGIN
    // *******************************************
    estaLogueado(  ) {
      return (this.token.length > 5) ? true : false;
    }

    logout() {
      this.usuario = null;
      this.token = '';
      this.menu = null;
      sessionStorage.clear();
      window.location.href = '/login';
    }

    loginGoogle(token) {
      const url = URL_SERVICIOS + '/login/google';

      return this.http.post(url, {token}).pipe(map((resp: any) => {

        this.guardarStorage(resp.id, resp.token, resp.usuario , resp.menu);

        return true;
      }));
    }

    login( usuario: Usuario, recordar: boolean = false ) {
        if (recordar) {
          localStorage.setItem('email', usuario.email);
        } else {
          localStorage.removeItem('email');
        }
        const url = URL_SERVICIOS + '/login';
        return this.http.post(url, usuario).pipe(map( (resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.usuario , resp.menu );
          return true;
        } ))
        .pipe(
          catchError(err =>
            of([
              console.log('HTTP Error', err.status),
              swal(
               'Error Login',
                err.error.mensaje,
                'error'
               )
             ])
          )
          );

    }

    // *******************************************
    //               Manipulacion Datos
    // *******************************************
  crearUsuario(usuario: Usuario) {
    const url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).pipe(map((resp: any) => {
      swal('Usuario Creado', usuario.email , 'success');
      return resp.usuario;
    }))
    .pipe(
      catchError(err =>
        of([
          console.log('HTTP Error', err.status),
          swal(
           err.error.mensaje,
            err.error.errors.message,
            'error'
           )
         ])
      )
      );

  }

  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;
    return this.http.put(url, usuario).pipe(map( (resp: any) => {

      if ( usuario._id === this.usuario._id ) {
        const usuarioDB: Usuario = resp.usuario;
        this.guardarStorage( usuarioDB._id , this.token , usuarioDB , this.menu );
      }

      swal('Usuario Actualizado', usuario.nombre, 'success');

      return true;

    } ));

  }

  cargarStorage() {
    if (sessionStorage.getItem('token')) {
      this.token = sessionStorage.getItem('token');
      this.usuario = JSON.parse(sessionStorage.getItem('usuario'));
      this.menu = JSON.parse(sessionStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    sessionStorage.setItem('id' , id);
    sessionStorage.setItem('token' , token);
    sessionStorage.setItem('usuario' , JSON.stringify(usuario));
    sessionStorage.setItem('menu' , JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  cambiarImagen( archivo: File, id: string ) {
      this._subirArchivoService.subirArchivo( archivo, 'usuarios' , id )
            .then( (resp: any) => {
              this.usuario.img = JSON.parse(resp).usuario.img;
              swal('Usuario Actualizado', this.usuario.nombre , 'success');
              this.guardarStorage( id, this.token, this.usuario , this.menu );
            }).catch( resp => {
              console.log(resp);
            });
  }

  cargarUsuarios(desde: number = 0) {
  const url = URL_SERVICIOS + '/usuario?desde=' + desde;

  return this.http.get(url);

  }

  buscarUsuarios( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url ).pipe(
      map( (resp: any) => resp.usuarios )
    )
    ;

  }

  borrarUsuario( id: string ) {
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url).pipe(map( resp => {
      swal('Usuario Borrado', 'El usuario a sido eliminado Correctamente', 'success'); return true;
    }));
  }

}
