import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from "../services/config";
@Injectable()
export class UserService {
  [x: string]: any;

  public url;
  public identity;
  public token;
  constructor(private _http: HttpClient) {
    this.url = config.local
      ? 'http://localhost:4000'
      : 'http://128.199.13.218:4000';
  }

  login(rut, password): Observable<any> {
    var params = {
      rut: rut,
      password: password,
    };

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this._http
      .post(this.url + '/api/v1/user/login', params, { headers: headers })
      .pipe(map((res) => res));
  }

  crearUsuario(params): Observable<any> {


    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this._http
      .post(this.url + '/api/v1/user/setUsuario', params, { headers: headers })
      .pipe(map((res) => res));
  }

  agregarDestinatarios(user): Observable<any> {
    var params = user;
    const token = sessionStorage.getItem('identity-equifax');

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Athorization: 'Bearer ' + token,
    });

    return this._http
      .post(this.url + '/api/v1/user/add/destinatarios', params, {
        headers: headers,
      })
      .pipe(map((res) => res));
  }
}
