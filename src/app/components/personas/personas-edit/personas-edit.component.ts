import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Persona } from 'src/app/models/Personas';
import { ToastrService } from 'ngx-toastr';
import { PersonaService } from 'src/app/services/persona.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-personas-edit',
  templateUrl: './personas-edit.component.html',
  styleUrls: ['./personas-edit.component.css']
})
export class PersonasEditComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;
  persona : Persona;
  idPersona? = 0;

  constructor(private fb: FormBuilder,
              private serv: PersonaService,
              private toast: ToastrService){
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(50)]],
      apellido: ['', [Validators.required, Validators.maxLength(50)]],
      dni:  ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
      fecNacimiento: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      direccion: ['']
    });
   }

  ngOnInit(): void {
    this.subscription = this.serv.obtenerPerona$().subscribe(data => {
      this.persona = data;
      this.form.patchValue({
        nombre : this.persona.nombre,
        apellido : this.persona.apellido,
        dni : this.persona.dni,
        fecNacimiento : this.persona.fecNacimiento ,
        direccion : this.persona.direccion
      });
      this.idPersona = this.persona.id;
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  Guardar(){
    if(this.idPersona === 0){
      const persona: Persona = {
        nombre: this.form.get('nombre')?.value,
        apellido: this.form.get('apellido')?.value,
        dni: this.form.get('dni')?.value,
        fecNacimiento: this.form.get('fecNacimiento')?.value,
        direccion: this.form.get('direccion')?.value,
        estado: true
      };
      this.serv.GuardaPersona(persona).subscribe(data => {
        this.toast.success('Registro Agregado', "La persona fue agregada");
        this.serv.ListPersonas();
        this.form.reset();
      });
    }else{
      const persona: Persona = {
        id : this.idPersona,
        nombre: this.form.get('nombre')?.value,
        apellido: this.form.get('apellido')?.value,
        dni: this.form.get('dni')?.value,
        fecNacimiento: this.form.get('fecNacimiento')?.value,
        direccion: this.form.get('direccion')?.value,
        estado: true
      };
      this.serv.GuardaPersona(persona).subscribe(data => {
        this.toast.info('Registro actualizado', "La persona fue actualizada");
        this.serv.ListPersonas();
        this.form.reset();
        this.idPersona = 0;
      });
    }
  }
}
