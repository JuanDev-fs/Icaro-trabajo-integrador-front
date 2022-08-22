import { Component } from '@angular/core';
import { GetUsersService } from './service/get-users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyAppMemo';
  stateSidenav: boolean = true

  constructor(public getUsersService: GetUsersService) { }

  //permite que al hacer click en el icono menu del toolbar se dispare un evento
  //que permite abrir y cerrar el sidenav
  receiveEvent($event: string) {
    this.stateSidenav = !this.stateSidenav
  }

  //permite detectar el ancho de la pantalla y asi cambiar estado del sidebar
  //si empuja el contenido en pantallas grandes o si esta sobre el contenido
  //en pantallas mas chicas.
  isLargeScreen() {
    const width = window.innerWidth;

    if (width > 720) {
      return true;
    } else {
      return false;
    }
  }
}
