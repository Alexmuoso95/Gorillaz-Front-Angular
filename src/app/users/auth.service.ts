import { Injectable } from '@angular/core';
import swall from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  
  login(user : User ): Observable<any>{
    const urlEndpoint = 'http://localhost:8081/oauth/token';
    const credentials = btoa('angularapp'+':'+'12345');
    const httpHeaders = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded',
                                     'Authorization':'Basic ' + credentials});
    
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.name);
    params.set('password', user.password);
    return this.http.post<any>(urlEndpoint, params.toString(), {headers:httpHeaders})
  }

}
