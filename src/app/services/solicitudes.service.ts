import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CambioEstatus, SolicitudLista } from '../interface/solicitudes.interface';
@Injectable({
  providedIn: 'root'
})
export class SolicitudesService {
  path = environment.apiURL + "solicitudes";
  constructor(private http: HttpClient) { }
  getSolicitudes() {
    return this.http.get(this.path + "/GetSolicitudes");
  }
  CrearSolicitud(solicitud: any) {
    return this.http.post(this.path + "/CrearSolicitud", solicitud);
  }
  ObtenerAusenciasEmpleado(idEmpleado: number): Observable<SolicitudLista[]> {
    return this.http.get<SolicitudLista[]>(`${this.path}/ObtenerAusenciasEmpleado?empleadoId=${idEmpleado}`);
  }
  ActualizarEstatus(cambioEstatus: CambioEstatus) {
    return this.http.put(this.path + "/ActualizarEstatus", cambioEstatus);
  }
}
