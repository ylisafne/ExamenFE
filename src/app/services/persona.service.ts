import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Persona } from '../models/Personas';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  BaseUrl = 'http://localhost:5047/';
  apiUrl = 'api/persona/';
  listPersona: Persona[];
  private actForm = new BehaviorSubject<Persona>({} as any);
  constructor(private http: HttpClient) { }
  /*** helpers ***/
  actualizar(persona : Persona){
    this.actForm.next(persona);
  } 
  obtenerPerona$(): Observable<Persona>{
    return this.actForm.asObservable();
  }

  /** api * */
  GuardaPersona(persona : Persona ): Observable<Persona>{
    return this.http.post<Persona>(this.BaseUrl + this.apiUrl, persona);
  }
  ListPersonas(){
    this.http.get(this.BaseUrl + this.apiUrl).toPromise().then(data=> {
      this.listPersona = data as Persona[];
    })
  }
  EliminarPersona(id:number){
    return this.http.delete(this.BaseUrl + this.apiUrl+ id);
  }





}
