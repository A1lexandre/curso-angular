import { Injectable } from '@angular/core';
import { AbstractControl} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidarCamposService {

  constructor() { }

  // Verifica se o campo que foi tocado e/ou estiver com algum valor está válido
  validarErros(control: AbstractControl, errorName: string) {
    return (control.touched || control.dirty) && this.hasError(control, errorName);
  }

  // Retorna true caso o "control" tenha algum erro.
  // Retorna false se o contrário
  private hasError(control: AbstractControl, errorName: string): boolean {
    return control.hasError(errorName);
  }

  public validarLength(control: AbstractControl, errorName: string) {
    const error = control.errors[errorName];
    return error.requiredLength || error.min || error.max || 0;
  }

}