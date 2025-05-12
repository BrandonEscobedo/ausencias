import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { StepperModule } from 'primeng/stepper';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { Toast } from 'primeng/toast';
import { InputText } from 'primeng/inputtext';

import { MessageService } from 'primeng/api';
import { EmpleadoDatos } from '../../interface/datos.interface';
import { EmpleadosService } from '../../services/empleados.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-generar-token',
  imports: [FormsModule, ReactiveFormsModule, ButtonModule, StepperModule, ButtonModule,
    FormsModule, ReactiveFormsModule, MatDividerModule, CommonModule, InputText, CommonModule, Toast],
  templateUrl: './generar-token.component.html',
  styleUrl: './generar-token.component.css',
  providers: [MessageService]
})
export class GenerarTokenComponent {
  empleadosService = inject(EmpleadosService);
  visible = false;
  botonVisible = false;
  numeroEmpleado: string = '';
  authService = inject(AuthService);
  continuarBoton = false;
  router = inject(Router);
  datosEmpleado: EmpleadoDatos = {
    id: 0,
    numeroEmpleado: '',
    nombres: '',
    apellidos: '',
    cargo: '',
    departamento: '',
    correo: ''
  };
  constructor(private fb: FormBuilder, private chf: ChangeDetectorRef, private messageService: MessageService) {
  }
  GenerarToken() {
    this.authService.GenerarYEnviarTokenEmpleado(this.datosEmpleado.id).subscribe({
      next: (response) => {
        console.log('Token generado y enviado:', response);
        this.datosEmpleado = response as EmpleadoDatos;
        this.messageService.add({ severity: 'success', summary: 'Token generado', detail: 'Token enviado correctamente' });
        setTimeout(() => {
          this.router.navigate(['/solicitudes']);
        }, 500);
        this.router.navigate(['/solicitudes']);

      },
      error: (error) => {
        console.error('Error al generar el token:', error);
        let errorDetail = 'Error al generar el token';
        if (error.error && typeof error.error === 'string') {
          errorDetail = error.error;
        } else if (error.error && error.error.detail) {
          errorDetail = error.error.detail;
        } else if (error.error && error.error.message) {
          errorDetail = error.error.message;
        } else if (error.message) {
          errorDetail = error.message;
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorDetail,
          life: 10000
        });
      }
    })
  }
  onBuscarUsuario() {

    this.empleadosService.ObtenerDatosEmpleado(this.numeroEmpleado).subscribe({
      next: (response) => {
        console.log('Empleado encontrado:', response);
        this.visible = true;
        this.continuarBoton = true;
        this.datosEmpleado = response as EmpleadoDatos;
        this.datosEmpleado.numeroEmpleado = this.numeroEmpleado;

        this.messageService.add({ severity: 'success', summary: 'Empleado encontrado', detail: 'Empleado encontrado correctamente' });
      },
      error: (error) => {
        console.error('Error al crear la solicitud:', error);
        let errorDetail = 'Error al crear la solicitud';
        if (error.error && typeof error.error === 'string') {
          errorDetail = error.error;
        } else if (error.error && error.error.detail) {
          errorDetail = error.error.detail;
        } else if (error.error && error.error.message) {
          errorDetail = error.error.message;
        } else if (error.message) {
          errorDetail = error.message;
        }
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: errorDetail,
          life: 10000
        });
      }
    })
  }
}
