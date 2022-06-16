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
        this.url = (config.local) ? "http://localhost:4000/api/v1" : "http://128.199.13.218:4000/api/v1";
    }


    deleteTickets(data) {
        var params = data

        const token = sessionStorage.getItem("identity-equifax");
        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': "Bearer " + token
        })

        return this._http.delete(this.url + '/tickets/deleteTickets', { headers: headers, params: params })
            .pipe(map(response => response));
    }
    updateTicket(value): Observable<any> {
        var params = value

        const token = sessionStorage.getItem("identity-equifax");
        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': "Bearer " + token
        })

        return this._http.put(this.url + '/tickets/updateTickets', params, { headers: headers })
            .pipe(map(response => response));
    }

    getTickets(): Observable<any> {
        const token = sessionStorage.getItem("identity-equifax");
        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': "Bearer " + token
        })

        return this._http.get(this.url + '/tickets/getTickets', { headers: headers })
            .pipe(map(response => response));
    }

    addTickets(data, dataEjecutivo): Observable<any> {
        var params = {
            titulo: data.titulo,
            descripcion: data.descripcion,
            status: data.status,
            nombre: dataEjecutivo
        };
        const token = sessionStorage.getItem("identity-equifax");
        let headers = new HttpHeaders({
            'Content-type': 'application/json',
            'Authorization': "Bearer " + token
        })
        return this._http.post(this.url + '/tickets/addTickets', params, { headers: headers })
            .pipe(map(response => response));
    }


}
