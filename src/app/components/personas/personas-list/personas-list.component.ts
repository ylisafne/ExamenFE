import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Persona } from 'src/app/models/Personas';
import { PersonaService } from 'src/app/services/persona.service';


@Component({
  selector: 'app-personas-list',
  templateUrl: './personas-list.component.html',
  styleUrls: ['./personas-list.component.css']
})
export class PersonasListComponent implements OnInit {

  constructor(public serv : PersonaService,
              private toast: ToastrService) { }

  ngOnInit(): void {
    this.serv.ListPersonas();
  }
  eliminar(id: number){
    if(confirm('Esta seguro de eliminar el registro?')){
      this.serv.EliminarPersona(id).subscribe(data =>{
        this.toast.warning("Registro Eliminado", "La persona fue eliminada");
        this.serv.ListPersonas();
      });
    }
  }
  editar(persona : Persona){
    this.serv.actualizar(persona);
  }
}
