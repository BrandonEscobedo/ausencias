import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from "jwt-decode";
export interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
  // agrega otros campos si tu token los tiene
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  path = environment.apiURL + "auth";
  constructor(private http: HttpClient) { }
  GenerarYEnviarTokenEmpleado(idEmpleado: number) {
    return this.http.post(`${this.path}/GenerarYEnviarTokenEmpleado?empleadoId=` + idEmpleado, {});
  }
  login(numeroEmpleado: string, correo: string) {
    return this.http.post(`${this.path}/login`, { numeroEmpleado, correo });
  }
  saveToken(token: string) {
    localStorage.setItem('access_token', token);
  }
  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role;
  }
  private redirectUrl: string | null = null;

  setRedirectUrl(url: string) {
    this.redirectUrl = url;
  }

  getRedirectUrl(): string | null {
    return this.redirectUrl;
  }

  clearRedirectUrl() {
    this.redirectUrl = null;
  }
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
