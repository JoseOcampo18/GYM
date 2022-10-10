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

  addCliente(cliente){
    return this.http.post<Clientes[]>(`${environment.baseUrlAPI}/clients`, cliente);
  }

  editCliente(cliente){
    return this.http.put<Clientes[]>(`${environment.baseUrlAPI}/clients/${cliente.id}`, cliente);
  }

  deleteCliente(id){
    return this.http.delete<Clientes[]>(`${environment.baseUrlAPI}/clients/${id}`);
  }

  getCliente(id){
    return this.http.get<Clientes[]>(`${environment.baseUrlAPI}/clients/${id}`);
  }
}

//https://api-sgsi.herokuapp.com/clients
//../assets/data/clientes.json
