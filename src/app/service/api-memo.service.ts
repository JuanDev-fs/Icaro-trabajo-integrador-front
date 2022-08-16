import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import{tap} from 'rxjs/operators'
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

  //private URL:string='http://localhost:3000/api/users'
 

  //implementacion de errores
  private handleError<T>(operation = 'operation', result?:T){
    return (error:any):Observable<T>=>{

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

 


  constructor(private http:HttpClient, private messageService:MessageService) { }

  private log(message: string) {
    this.messageService.add(`ApiMemoService: ${message}`);
  }


  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(!token){
      return false
    } else {
      return true
    }
  }

 /*  isLogged():Observable<string>{
    const username = localStorage.getItem('username')
    if(username){
      return username
    } else {
      return ""
    }
  } */

  getAllUsers(): Observable<UsuariosRx[]>{
    return this.http.get<UsuariosRx[]>(/* this.URL */'api/users')
    .pipe(tap(_ => this.log('fetched users')),catchError(this.handleError<UsuariosRx[]>('getAllUsers',[])))//implementacion de errores
  }

  createUser(user:Usuarios): Observable<Usuarios[]>{
    return this.http.post<Usuarios[]>('api/users', user/* , this.httpOptions */)
    .pipe(tap(_ => this.log('fetched user create')),catchError(this.handleError<Usuarios[]>('createUsers',[])))//implementacion de errores
  }

  login(user:UsuarioLogin):Observable<any>{
    return this.http.post<any>('api/login', user/* , this.httpOptions */)
    .pipe(tap(_ => this.log('fetched user login')),catchError(this.handleError<any>('login',[])))//implementacion de errores
  }

  // login(user:UsuarioLogin){
  //   return this.http.post<UsuarioLogin[]>('api/login', user/* , this.httpOptions */)
  //   .pipe(tap(_ => this.log('fetched user login')),catchError(this.handleError<UsuarioLogin[]>('login',[])))//implementacion de errores
  // }

  // login(user:UsuarioLogin):Observable<UsuarioLogin[]>{
  //   return this.http.post<UsuarioLogin[]>('api/login', user)
  //   .pipe(tap(_ => this.log('fetched user login')),catchError(this.handleError<UsuarioLogin[]>('login',[])))//implementacion de errores
  // }

//test con apiMemoV2
  getAllMessageSent(username:string): Observable<any[]>{
    return this.http.get<any[]>(`api/users/${username}/messages/sent`/* , this.httpOptions */)
    .pipe(tap(_ => this.log('fetched messages sent')),catchError(this.handleError<any[]>('getAllMessageSent',[])))//implementacion de errores
  }

  // esta funciona con apiMemo
  // getAllMessageSent(username:string): Observable<Inbox[]>{
  //   return this.http.get<Inbox[]>(`api/users/${username}/messages/sent`/* , this.httpOptions */)
  // }

//test apiMemoV2
  getAllMessageInbox(username:string): Observable<any[]>{
    return this.http.get<any[]>(`api/users/${username}/messages/inbox`/* , this.httpOptions */)
    .pipe(tap(_ => this.log('fetched messages received')),catchError(this.handleError<any[]>('getAllMessageInbox',[])))//implementacion de errores
  }

  // esta funciona con apiMemo
  // getAllMessageInbox(username:string): Observable<Inbox[]>{
  //   return this.http.get<Inbox[]>(`api/users/${username}/messages/inbox`/* , this.httpOptions */)
  // }


  createNewMessage(username:string,newMessage:any){
    return this.http.post<NewMessage[]>(`api/users/${username}/messages/`, newMessage/* , this.httpOptions */)
    .pipe(tap(_ => this.log('fetched new message')),catchError(this.handleError<any[]>('createNewMessage',[])))//implementacion de errores
  }

  // createNewMessage(username:string,newMessage:NewMessage):Observable<NewMessage[]>{
  //   return this.http.post<NewMessage[]>(`api/users/${username}/messages/`, newMessage/* , this.httpOptions */)
  // }


  //PUT
  updateReadMessageStatus(username:string,id:number){
    const body = { title: 'Angular PUT Request Example' }
    return this.http.put(`api/users/${username}/messages/${id}`,body)
    .pipe(tap(_ => this.log('fetched status new message')),catchError(this.handleError<any[]>('updateReadMessageStatus',[])))//implementacion de errores
  }

  //Test agregar leido
  /* updateMessage(username:string,messageId:number): Observable<any> {
    return this.http.put(`api/users/${username}/messages/${messageId}`, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated messaage id=${messageId}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  } */

}
//'/api/users/:username/messages/inbox'


/* 


updateHero(hero: Hero): Observable<any> {
  return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
    tap(_ => this.log(`updated hero id=${hero.id}`)),
    catchError(this.handleError<any>('updateHero'))
  );
}


*/