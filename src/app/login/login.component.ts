import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {
  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor(
    public router: Router,
    // tslint:disable-next-line:variable-name
    public _usuarioService: UsuarioService
    ) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.email = localStorage.getItem('email') || '';
    if (this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
    gapi.load('auth2', ( ) => {
      this.auth2 = gapi.auth2.init({
        client_id: '348727745875-g3hifq5bff8ncb9ro6pbefp601e09p0s',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      this.attachSignin(document.getElementById('btnGoogle'));

    });
  }

  // tslint:disable-next-line:no-shadowed-variable
  attachSignin( element: any ) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this._usuarioService.loginGoogle(token)
                .subscribe(() => window.location.href = '/dashboard');
    });
  }

  ingresar( forma: NgForm ) {
    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email , forma.value.password );

    const user = this._usuarioService.login(usuario, forma.value.recuerdame)
    .subscribe(correcto => this.router.navigate(['/dashboard']) );
    // this.router.navigate(['/dashboard']);
  }

}
