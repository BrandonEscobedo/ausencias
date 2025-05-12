import { Routes } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ListaSolicitudesComponent } from './Components/solicitudes/lista-solicitudes/lista-solicitudes.component';
import { CrearSolicitudComponent } from './Components/solicitudes/crear-solicitud/crear-solicitud.component';
import { LoginComponent } from './Components/auth/login/login.component';
import { authGuard } from './Interceptor/auth.guard';
import { autenticadoGuard } from './Interceptor/autenticado.guard';

export const routes: Routes = [

    {
        path: '', component: NavbarComponent,
        canActivate: [autenticadoGuard],
        children: [
            {
                path: 'solicitudes', component: ListaSolicitudesComponent,
                canActivate: [autenticadoGuard],
                data: { role: "RH" }
            },
            {
                path: "crearSolicitud", component: CrearSolicitudComponent,
                canActivate: [autenticadoGuard],
            },
            {
                path: "solicitudesPendientes", loadComponent() {
                    return import('./Components/solicitudes/solicitudes-pendientes/solicitudes-pendientes.component').then(c => c.SolicitudesPendientesComponent)
                },
            }, {
                path: "chat", loadComponent() {
                    return import('./Components/chat/chat/chat.component').then(c => c.ChatComponent)
                }
            },
            {
                path: "Solicitud/:folio", loadComponent() {
                    return import('./Components/solicitudes/solicitud-actualizar/solicitud-actualizar.component').then(c => c.SolicitudActualizarComponent)
                }
            },
            {
                path: "generarToken", loadComponent() {
                    return import('./Components/generar-token/generar-token.component').then(c => c.GenerarTokenComponent)
                }
            },
            {
                path: 'no-disponbile', loadComponent() {
                    return import('./Components/shared/liberada/liberada.component').then(c => c.LiberadaComponent)
                }
            }




        ]
    },
    {
        path: "login", component: LoginComponent

    }
];
