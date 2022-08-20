import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators'
import { Inbox } from '../inbox.interface';
import { NewMessage } from '../newMessage.interface';
import { TokenData } from '../token.interface';
import { Usuarios } from '../usuarios.interface';
import { UsuarioLogin } from '../usuariosLogin.interface';
import { UsuariosRx } from '../usuariosRx.interface';
import { MessageService } from './message.service';


@Injectable({
  providedIn: 'root'
})
export class ApiMemoService {

  //implementacion de errores
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      //TODO: send the error to remote logging infrastructure
      console.log(error); //log to console instead

      //TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.error}`)//o error.message

      return of(result as T)
    }
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  private log(message: string) {
    this.messageService.add(`ApiMemoService: ${message}`);
  }


  isAuth(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false
    } else {
      return true
    }
  }


  getAllUsers(): Observable<UsuariosRx[]> {
    return this.http.get<UsuariosRx[]>(/* this.URL */'api/users')
      .pipe(tap(_ => this.log('fetched users')), catchError(this.handleError<UsuariosRx[]>('getAllUsers', [])))//implementacion de errores
  }

  createUser(user: Usuarios): Observable<Usuarios[]> {
    return this.http.post<Usuarios[]>('api/users', user/* , this.httpOptions */)
      .pipe(tap(_ => this.log('fetched user create')), catchError(this.handleError<Usuarios[]>('createUsers', [])))//implementacion de errores
  }

  login(user: UsuarioLogin): Observable<any> {
    return this.http.post<any>('api/login', user/* , this.httpOptions */)
      .pipe(tap(_ => this.log('fetched user login')), catchError(this.handleError<any>('login', [])))//implementacion de errores
  }

  getAllMessageSent(username: string): Observable<any[]> {
    return this.http.get<any[]>(`api/users/${username}/messages/sent`/* , this.httpOptions */)
      .pipe(tap(_ => this.log('fetched messages sent')), catchError(this.handleError<any[]>('getAllMessageSent', [])))//implementacion de errores
  }

  getAllMessageInbox(username: string): Observable<any[]> {
    return this.http.get<any[]>(`api/users/${username}/messages/inbox`/* , this.httpOptions */)
      .pipe(tap(_ => this.log('fetched messages received')), catchError(this.handleError<any[]>('getAllMessageInbox', [])))//implementacion de errores
  }

  createNewMessage(username: string, newMessage: any) {
    return this.http.post<NewMessage[]>(`api/users/${username}/messages/`, newMessage/* , this.httpOptions */)
      .pipe(tap(_ => this.log('fetched new message')), catchError(this.handleError<any[]>('createNewMessage', [])))//implementacion de errores
  }

  //PUT
  updateReadMessageStatus(username: string, id: number) {
    const body = { title: 'Angular PUT Request Example' }
    return this.http.put(`api/users/${username}/messages/${id}`, body)
      .pipe(tap(_ => this.log('fetched status new message')), catchError(this.handleError<any[]>('updateReadMessageStatus', [])))//implementacion de errores
  }


}
