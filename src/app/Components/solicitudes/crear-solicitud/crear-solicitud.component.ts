import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { SolicitudesService } from '../../../services/solicitudes.service';
import { StepperModule } from 'primeng/stepper';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { Toast } from 'primeng/toast';
import { InputText } from 'primeng/inputtext';
import { EmpleadosService } from '../../../services/empleados.service';
import { EmpleadoDatos } from '../../../interface/datos.interface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  imports: [FormsModule, ReactiveFormsModule, Select, DatePicker, ButtonModule, StepperModule, Select, ButtonModule,
    FormsModule, ReactiveFormsModule, MatDividerModule, CommonModule, InputText, CommonModule, Toast],
  styleUrls: ['./crear-solicitud.component.css'],
  providers: [MessageService]
})
export class CrearSolicitudComponent implements OnInit {
  solicitudForm: FormGroup = new FormGroup({});
  solicitudesService = inject(SolicitudesService);
  empleadosService = inject(EmpleadosService);
  visible = false;
  botonVisible = false;
  numeroEmpleado: string = '';
  continuarBoton = true;
  datosEmpleado: EmpleadoDatos = {
    id: 0,
    numeroEmpleado: '',
    nombres: '',
    apellidos: '',
    cargo: '',
    departamento: '',
    correo: ''
  };
  tipos = [
    { label: 'vacaciones', value: 'vacaciones' },
    { label: 'Permiso', value: 'Permiso' },
    { label: 'enfermedad', value: 'enfermedad' }
  ];
  constructor(private fb: FormBuilder, private chf: ChangeDetectorRef, private messageService: MessageService) {
    this.initializateForm();
  }
  onBuscarUsuario() {

    this.empleadosService.ObtenerEmpleadoPorNumeroEmpleado(this.numeroEmpleado).subscribe({
      next: (response) => {
        console.log('Empleado encontrado:', response);
        this.visible = true;
        this.continuarBoton = false;
        this.datosEmpleado = response as EmpleadoDatos;
        this.datosEmpleado.numeroEmpleado = this.numeroEmpleado;
        this.solicitudForm.patchValue({
          EmpleadoId: this.datosEmpleado.id,
        });
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
  initializateForm() {
    this.solicitudForm = new FormGroup({
      EmpleadoId: new FormControl(0),
      FechaInicio: new FormControl(null, Validators.required),
      FechaFin: new FormControl(null, Validators.required),
      Tipo: new FormControl(null, Validators.required),
      Comentarios: new FormControl(''),
    }, { validators: this.fechaFinMayorOIgual() }); // <-- aquí
  }
  ngOnInit(): void {
  }
  fechaFinMayorOIgual(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const fechaInicio = control.get('FechaInicio')?.value;
      const fechaFin = control.get('FechaFin')?.value;

      if (fechaInicio && fechaFin && new Date(fechaFin) < new Date(fechaInicio)) {
        return { fechaInvalida: true };
      }

      return null;
    };
  }
  activeIndex: number = 1; // Variable para controlar el paso actual del stepper

  onSubmit(): void {
    if (this.solicitudForm.invalid || this.solicitudForm.errors?.['fechaInvalida']) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error de validación',
        detail: 'La fecha de fin debe ser igual o posterior a la fecha de inicio.',
      });
      return;
    }
    const datos = this.solicitudForm.value;
    this.solicitudesService.CrearSolicitud(this.solicitudForm.value).subscribe({
      next: (response) => {
        console.log('Solicitud creada:', response);
        this.messageService.add({ severity: 'success', summary: 'Solicitud creada', detail: 'Solicitud creada correctamente' });
        this.activeIndex = 3;

      },
      error: (error) => {
        console.error('Error al crear la solicitud:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Error al crear la solicitud' });
      }
    })


  }
}
