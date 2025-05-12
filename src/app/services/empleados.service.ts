import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  path = environment.apiURL + "Empleados";

  constructor(private http: HttpClient) { }
  ObtenerEmpleadoPorNumeroEmpleado(numeroEmpleado: string) {
    return this.http.get(`${this.path}/ObtenerEmpleadoPorNumeroEmpleado?NumeroEmpleado=${numeroEmpleado}`);
  }
  ObtenerDatosEmpleado(numeroEmpleado: string) {
    return this.http.get(`${this.path}/ObtenerDatosEmpleado?NumeroEmpleado=${numeroEmpleado}`);
  }
}
