import { Injectable } from '@angular/core';
import { formatDate , DatePipe , registerLocaleData} from '@angular/common';
import { Client } from './client';
import { of, Observable, throwError }from 'rxjs';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { map ,catchError, tap } from 'rxjs/operators';
import swall from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private urlEndpoint: string = 'http://localhost:8081/v1/clients';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient , private router : Router) { }

  private isNotAuthorized(e) : boolean{
    if(e.status==401 || e.status==403   ){
      this.router.navigate(['/login']);
      return true;
    }
    return false;
  } 

  getClients(): Observable<Client[]> {
   return this.http.get<Client[]>(this.urlEndpoint).pipe(    
    map((response) =>{
      let clients = response as Client[];
      return clients.map(client => {
        client.name = client.name.toUpperCase();
        client.name = client.lastName.toUpperCase();
        return client;
      });
    }),
   );
  }

  getClientsPage(page: number): Observable<any> {
   return this.http.get<any>(this.urlEndpoint + '/page/' + page).pipe(
    map((response : any) => {
     (response.content as Client []).map(c => {
      return c;
     });
     return response;
    })
   );
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.urlEndpoint,client,{headers: this.httpHeaders}).pipe(
      catchError(e => {
      if( this.isNotAuthorized(e)){
        return throwError(e);
      }
      this.router.navigate(['/clients/form']);
      swall.fire('Error al crear cliente' , e.error.message, 'error' );
      return throwError(e);
    }));
   }

   getClient(id) : Observable<Client> {
    return this.http.get<Client>(`${this.urlEndpoint}/${id}`).pipe(catchError(e => {
      if( this.isNotAuthorized(e)){
        return throwError(e);
      }
      this.router.navigate(['/clients'])
      swall.fire('Error al buscar cliente' , e.error.message, 'error' )
      return throwError(e);
    }));
  }

  updateClient(client : Client) : Observable<Client> {
    return this.http.put<Client>(`${this.urlEndpoint}/${client.id}`,client,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(this.isNotAuthorized(e)){
          return throwError(e);
        }
        if(e.status==400){
          return throwError(e);
        }
      this.router.navigate(['/clients/form'])
      swall.fire('Error al actualizar cliente' , e.error.message, 'error' )
      return throwError(e);
    }));
  }

  deleteClient(id : number) : Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndpoint}/${id}`,{headers: this.httpHeaders}).pipe(  catchError(e => {
      if(this.isNotAuthorized(e)){
        return throwError(e);
      }
      if(e.status==400){
        return throwError(e);
      }
    this.router.navigate(['/clients/form'])
    swall.fire('Error al actualizar cliente' , e.error.message, 'error' )
    return throwError(e);
  }));
  }
}