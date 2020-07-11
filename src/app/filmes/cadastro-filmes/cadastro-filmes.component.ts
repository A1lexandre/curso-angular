import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


import { ValidarCamposService } from './../../shared/components/campos/validar-campos.service';
import { FilmeService } from './../../core/filme.service';
import { Filme } from 'src/app/shared/models/filme';
import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';


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
  constructor(public dialog: MatDialog,
              public validacao: ValidarCamposService,
              private fb: FormBuilder,
              private filmeService: FilmeService,
              private router: Router) { }

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
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;
    this.cadastro.reset();
    this.salvar(filme);
 }

  private salvar(filme) {
   this.filmeService.salvar(filme).subscribe(
     () => {
     const config = {
       data: {
         txtBtnSucesso: 'Ir para listagem',
         txtBtnCancelar: 'Adicionar novo filme',
         possuirBtnFechar: true
       } as Alerta
     };
     const dialogRef = this.dialog.open(AlertaComponent, config);
     dialogRef.afterClosed().subscribe((resp) => {
       if (resp) {
         this.router.navigateByUrl('filmes');
       }
     });
   },
     () => {
     const config = {
        data: {
          titulo: 'Filme não registrado',
          descricao: 'Não foi possível registrar o filme, por favor tente mais tarde.',
          txtBtnSucesso: 'OK',
          colorBtnSucesso: 'warn'
        } as Alerta
    }
     this.dialog.open(AlertaComponent, config);
    });
  }
}