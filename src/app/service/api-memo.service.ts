import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewMessage } from '../newMessage.interface';
import { Usuarios } from '../usuarios.interface';
import { UsuarioLogin } from '../usuariosLogin.interface';
import { UsuariosRx } from '../usuariosRx.interface';


@Injectable({
  providedIn: 'root'
})
export class ApiMemoService {


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  isAuth(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false
    } else {
      return true
    }
  }


  getAllUsers(): Observable<UsuariosRx[]> {
    return this.http.get<UsuariosRx[]>('api/users')
  }

  createUser(user: Usuarios) {
    return this.http.post('api/users', user)
  }

  login(user: UsuarioLogin) {
    return this.http.post<any>('api/login', user)
  }

  getAllMessageSent(username: string): Observable<any[]> {
    return this.http.get<any[]>(`api/users/${username}/messages/sent`)
  }

  getAllMessageInbox(username: string): Observable<any[]> {
    return this.http.get<any[]>(`api/users/${username}/messages/inbox`)
  }

  createNewMessage(username: string, newMessage: any) {
    return this.http.post<NewMessage[]>(`api/users/${username}/messages/`, newMessage)
  }

  updateReadMessageStatus(username: string, id: number) {
    const body = { title: 'Angular PUT Request Example' }
    return this.http.put(`api/users/${username}/messages/${id}`, body)
  }

}
