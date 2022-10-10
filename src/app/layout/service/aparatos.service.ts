import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Aparatos } from '../api/aparatos';
import { environment } from 'src/environments/environment';

const httpOptions ={
  headers : new HttpHeaders ({'Content-Type':'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AparatosService {

  constructor(private http: HttpClient) { }

  getAparatos() {
    return this.http.get<Aparatos[]>(`${environment.baseUrlAPI}/gears`);
  }

  addAparato(aparato) {
    return this.http.post<Aparatos[]>(
      `${environment.baseUrlAPI}/gears`,
      aparato
    );
  }

  editAparato(aparato) {
    return this.http.put<Aparatos>(
      `${environment.baseUrlAPI}/gears/${aparato.id}`,
      aparato
    );
  }

  deleteAparato(id) {
    return this.http.delete<Aparatos[]>(
      `${environment.baseUrlAPI}/gears/${id}`
    );
  }

  getAparato(id) {
    return this.http.get<Aparatos[]>(`${environment.baseUrlAPI}/gears/${id}`);
  }
}
