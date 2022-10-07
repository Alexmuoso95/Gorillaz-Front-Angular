import { Injectable } from '@angular/core';
import { Client } from './client';
import { of, Observable, throwError }from 'rxjs';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { map ,catchError, switchAll } from 'rxjs/operators';
import swall from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private urlEndpoint: string = 'http://localhost:8081/v1/client';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient , private router : Router) { }
  getClients(): Observable<Client[]> {
   return this.http.get<Client[]>(this.urlEndpoint).pipe(
    map((response) => response as Client [])
   );
  }

  createClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.urlEndpoint,client,{headers: this.httpHeaders}).pipe(
      catchError(e => {

      if(e.status==400){
        return throwError(e);
      }

      this.router.navigate(['/clients/form'])
      swall.fire('Error al crear cliente' , e.error.message, 'error' )
      return throwError(e);
    }));
   }

   getClient(id) : Observable<Client> {
    return this.http.get<Client>(`${this.urlEndpoint}/${id}`).pipe(catchError(e => {
      this.router.navigate(['/clients'])
      swall.fire('Error al buscar cliente' , e.error.message, 'error' )
      return throwError(e);
    }));
  }

  updateClient(client : Client) : Observable<Client> {
    return this.http.put<Client>(`${this.urlEndpoint}/${client.id}`,client,{headers: this.httpHeaders}).pipe(
      catchError(e => {

      if(e.status==400){
        return throwError(e);
      }

      this.router.navigate(['/clients/form'])
      swall.fire('Error al actualizar cliente' , e.error.message, 'error' )
      return throwError(e);
    }));
  }

  deleteClient(id : number) : Observable<Client> {
    return this.http.delete<Client>(`${this.urlEndpoint}/${id}`,{headers: this.httpHeaders});
  }
}