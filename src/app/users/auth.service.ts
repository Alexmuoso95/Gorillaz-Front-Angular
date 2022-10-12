import { Injectable } from '@angular/core';
import swall from 'sweetalert2';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaderResponse, HttpHeaders } from '@angular/common/http';
import { User } from './user'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user : User;
  private _token : string;

  constructor(private http: HttpClient) { }

  public get getUser() : User{
    if(this._user!=null){
      return this._user;
    }else if (this._user == null && sessionStorage.getItem('user') !=null ) {
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();
  }
  
  public get getToken() : string{
    if(this._user!=null){
      return this._token;
    }else if (this._token == null && sessionStorage.getItem('token')!=null) {
      this._token = sessionStorage.getItem('token');
      return this._token
    }
    return null;
  }

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

  saveUser(accesToken : string) : void{
    let payload = this.getTokenDetails(accesToken);
    this._user = new User();
    this._user.name = payload.user_name;
    this._user.authorities = payload.authorities;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveToken(accessToken : string) : void{
    this._token = accessToken;
    sessionStorage.setItem('token',this._token);
  }

  getTokenDetails(accessToken : string) : any{
    if(accessToken != null ){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  isAuthenticated(): boolean{
    let payload = this.getTokenDetails(this.getToken);
    if(payload!=null && payload.user_name && payload.user_name.length>0){
      return true;
    }
    return false;
  }
  logout():void {
    this._token =null;
    this._user =null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
  }
}
