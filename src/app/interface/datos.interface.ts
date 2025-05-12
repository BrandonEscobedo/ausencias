export interface Empleado {
  id: number
  numeroEmpleado: string
  nombres: string
  apellidos: string
  cargo: string
  departamento: string
  idRol: number
  correo: string
  rol: Rol
  jefeId: number
}

export interface Rol {
  id: number
  nombre: string
  descripcion: string
}

export interface Jefe {
  id: number
  numeroEmpleado: string
  nombres: string
  apellidos: string
  cargo: string
  departamento: string
  idRol: number
  correo: string
  rol: any
  jefeId: number
}
