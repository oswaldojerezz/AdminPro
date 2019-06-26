import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  // tslint:disable-next-line:variable-name
  constructor( public _usuarioService: UsuarioService ) {

  }

  canActivate() {
    if ( this._usuarioService.usuario.role === 'admin' ) {
      return true;
    } else {
      console.log('Bloqueado por el admin Guard');
      this._usuarioService.logout();
      return false;
    }
  }

}
