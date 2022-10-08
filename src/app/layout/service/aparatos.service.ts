import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Aparatos } from '../api/aparatos';

const httpOptions ={
  headers : new HttpHeaders ({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AparatosService {

  constructor(private http: HttpClient) { }

  getAparatos(){
    return this.http.get<any>('../assets/data/aparatos.json')
            .toPromise()
            .then(res => res.data as Aparatos[])
            .then(data => data);
  }
}
