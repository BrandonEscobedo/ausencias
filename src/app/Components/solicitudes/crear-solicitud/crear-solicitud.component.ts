import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Select } from 'primeng/select';
import { DatePicker } from 'primeng/datepicker';
import { ButtonModule } from 'primeng/button';
import { SolicitudesService } from '../../../services/solicitudes.service';

@Component({
  selector: 'app-crear-solicitud',
  templateUrl: './crear-solicitud.component.html',
  imports: [FormsModule, ReactiveFormsModule, Select, DatePicker, ButtonModule],
  styleUrls: ['./crear-solicitud.component.css']
})
export class CrearSolicitudComponent implements OnInit {
  solicitudForm: FormGroup = new FormGroup({});
  solicitudesService = inject(SolicitudesService);
  tipos = [
    { label: 'Vacaciones', value: 'Vacaciones' },
    { label: 'Permiso', value: 'Permiso' },
    { label: 'Otro', value: 'Otro' }
  ];
  constructor(private fb: FormBuilder) {
    this.initializateForm();
  }
  initializateForm() {
    this.solicitudForm = new FormGroup({
      FechaInicio: new FormControl(null, Validators.required),
      FechaFin: new FormControl(null, Validators.required),
      Tipo: new FormControl(null, Validators.required),
      Comentarios: new FormControl(''),
      EmpleadoId: new FormControl(0, Validators.required),
    });
  }
  ngOnInit(): void {
    var solicitudes = this.solicitudesService.getSolicitudes();
    solicitudes.subscribe((data) => {
      console.log(data);
    });

  }
  onSubmit(): void {
    if (this.solicitudForm.valid) {
      this.solicitudesService.CrearSolicitud(this.solicitudForm.value).subscribe({
        next: (response) => {
          console.log('Solicitud creada:', response);
          this.solicitudForm.reset();
        },
        error: (error) => {
          console.error('Error al crear la solicitud:', error);
        }
      })
    }
  }
}
