import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';
import { FilmeService } from './../../core/filme.service';
import { Filme } from 'src/app/shared/models/filme';


@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;

  // A variável do tipo FormBuilder já está
 // sendo declarada como atributo da classe e sendo
 // instanciada
  constructor(private fb: FormBuilder,
              private filmeService: FilmeService,
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

    this.generos = ['Ação', 'Aventura', 'Ficção Científica', 'Romance', 'Terror'];

  }

  submit(): void {
    if (this.cadastro.invalid) {
      return;
    }
    
    const filme = this.cadastro.getRawValue() as Filme;
    this.cadastro.reset();
    this.salvar(filme);
 }

  private salvar(filme) {
   this.filmeService.salvar(filme).subscribe(() => {
     alert('Sucesso');
   });
 }

}
