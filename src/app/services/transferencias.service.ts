import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { HttpClientModule, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { config } from "./config";

@Injectable()
export class TicketsService {
    [x: string]: any;

    public url;
    public identity;
    public token;
    constructor(private _http: HttpClient) {
        this.url = (config.local) ? "http://localhost:4000/api/v2" : "http://128.199.13.218:4000/api/v1";
    }

    postNuevoDestinatario(user): Observable<any> {
        const token = sessionStorage.getItem("identity-equifax");
        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': "Bearer " + token
        })
        var params = user
        return this._http.post(this.url + '/tr/nuevo/destinatario', params, { headers: headers })
            .pipe(map(response => response));
    }


    getTickets(): Observable<any> {
        console.log('get Tickets')
        const token = sessionStorage.getItem("identity-equifax");
        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': "Bearer " + token
        })

        return this._http.get(this.url + '/diego', { headers: headers });
    }

    getTipoCUenta(): Observable<any> {
        console.log("hola");

        var params = {}
        const token = sessionStorage.getItem("identity-equifax");

        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': "Bearer " + token
        })

        return this._http.get(this.url + '/tr/list/cuentas', { headers: headers })
    }

    getBancos(): Observable<any> {


        let headers = new HttpHeaders({
            'Content-type': 'application/json',
        })

        return this._http.get('https://bast.dev/api/banks.php', { headers: headers })
            .pipe(map(response => response));
    }

    postTransferencia(data): Observable<any> {


        let headers = new HttpHeaders({
            'Content-type': 'application/json',
        })

        var params;
        params = {
            //faltan params
        }
        return this._http.post(this.url + '/tr/nueva/transferencia', params, { headers: headers })
            .pipe(map(response => response));
    }


    getMisdestinatarios(): Observable<any> {
        var params = {}
        const token = sessionStorage.getItem("identity-equifax");

        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': "Bearer " + token
        })

        return this._http.get(this.url + '/tr/list/destinatarios', { headers: headers })
    }

    transferir(data): Observable<any> {
        var params = data
        const token = sessionStorage.getItem("identity-equifax");

        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': "Bearer " + token
        })

        return this._http.post(this.url + '/tr/transferir', params, { headers: headers });
    }

}
