import { Empleado, Jefe } from "./datos.interface"

export interface SolicitudRequest {
    FechaInicio: Date,
    FechaFin: Date,
    Tipo: string,
    Comentarios: string,
}
export interface AusenciasEmpleado {
    EmpleadoId: number,
    FechaInicio: Date,
    FechaFin: Date,
    Tipo: string,
    Comentarios: string,
}
export interface SolicitudLista {
    id: number
    empleadoId: number
    folio: string
    empleado: Empleado
    jefe: Jefe
    fechaInicio: string
    fechaFin: string
    estatus: string
    tipo: string
    comentarios: string
}
export interface CambioEstatus{
    folio:string,
    numeroEmpleado:string,
    comentarios:string,
    estatus:number
}
export class SolicitudModelClass{
    id: number = 0;
    empleadoId: number = 0;
    folio: string = '';
    empleado: Empleado = {} as Empleado;
    jefe: Jefe = {} as Jefe;
    fechaInicio: string = '';
    fechaFin: string = '';
    estatus: string = '';
    tipo: string = '';
    comentarios: string = '';
    constructor() {
        
    }
}