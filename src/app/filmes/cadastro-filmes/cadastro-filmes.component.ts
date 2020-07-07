import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';


@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;

  // A variável do tipo FormBuilder já está
 // sendo declarada como atributo da classe e sendo
 // instanciada
  constructor(private fb: FormBuilder,
              public validacao: ValidarCamposService) { }

  ngOnInit(): void {

    this.cadastro = this.fb.group({
      'titulo': ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      'imagemUrl': ['', Validators.minLength(10)],
      'dtLancamento': ['', Validators.required],
      'descricao': [''],
      'notaIMDb': [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      'iMDbUrl': ['', Validators.minLength(10)],
      'genero': ['', Validators.required]
    });

    console.log(this.cadastro);

  }

  salvar(): void {
    console.log(this.cadastro);
    if (this.cadastro.invalid) {
      return;
    }

  console.log(this.cadastro.value);
 }

 get f() {
   return this.cadastro.controls;
 }

}
