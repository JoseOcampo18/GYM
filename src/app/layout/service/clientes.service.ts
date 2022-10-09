import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clientes } from '../api/clientes';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class ClientesService {
  constructor(private http: HttpClient) {}

  getClientes() {
    return this.http.get<Clientes[]>(`${environment.baseUrlAPI}/clients`);
  }
}

//https://api-sgsi.herokuapp.com/clients
//../assets/data/clientes.json
