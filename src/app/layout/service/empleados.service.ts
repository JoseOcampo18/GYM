import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Clientes } from '../api/clientes';
import { Empleados } from '../api/empleados';

const httpOptions ={
  headers : new HttpHeaders ({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {

  constructor(private http: HttpClient) { }

  getEmpleados(){
    return this.http.get<any>('../assets/data/empleados.json')
            .toPromise()
            .then(res => res.data as Empleados[])
            .then(data => data);
  }
}
