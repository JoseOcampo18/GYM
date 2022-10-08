import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clientes } from '../api/clientes';

const httpOptions ={
  headers : new HttpHeaders ({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  constructor(private http: HttpClient) { }

  getClientes(){
    return this.http.get<any>('../assets/data/clientes.json')
            .toPromise()
            .then(res => res.data as Clientes[])
            .then(data => data);
  }
}

//https://api-sgsi.herokuapp.com/clients
//../assets/data/clientes.json