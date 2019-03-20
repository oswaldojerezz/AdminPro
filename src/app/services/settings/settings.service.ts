import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl : 'assets/css/colors/default-dark.css',
    tema: 'default'
  };

  // tslint:disable-next-line:variable-name
  constructor( @Inject(DOCUMENT) private _document , ) {
    this.cargarAjustes();
   }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));
  }

  cargarAjustes() {
    if ( localStorage.getItem('ajustes') ) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      this.aplicarTema( this.ajustes.tema );
    } else {
      this.aplicarTema( this.ajustes.tema );
    }

  }

  aplicarTema( tema: string ) {
    const colorUrl = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', colorUrl);
    this.ajustes.tema = tema;
    this.ajustes.temaUrl = colorUrl;
    this.guardarAjustes();
  }

}

interface Ajustes {
  temaUrl: string;
  tema: string;
}
