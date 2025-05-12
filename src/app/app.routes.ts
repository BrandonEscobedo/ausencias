import { Routes } from '@angular/router';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ListaSolicitudesComponent } from './Components/solicitudes/lista-solicitudes/lista-solicitudes.component';
import { CrearSolicitudComponent } from './Components/solicitudes/crear-solicitud/crear-solicitud.component';

export const routes: Routes = [

{
    path: '',component:NavbarComponent,
    children:[
        {
            path:'solicitudes',component:ListaSolicitudesComponent,
            
        },
        {
            path:"crearSolicitud",component:CrearSolicitudComponent
        },
        {
            path:"solicitudesPendientes",loadComponent() {
                return import('./Components/solicitudes/solicitudes-pendientes/solicitudes-pendientes.component').then(c => c.SolicitudesPendientesComponent)
            },
        } ,{
            path:"chat",loadComponent() {
                return import('./Components/chat/chat/chat.component').then(c => c.ChatComponent)
            }
        }
        

    ]
}
];
