import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';


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
  id: number;
  filme: Filme;

  // A variável do tipo FormBuilder já está
 // sendo declarada como atributo da classe e sendo
 // instanciada
  constructor(public dialog: MatDialog,
              public validacao: ValidarCamposService,
              private fb: FormBuilder,
              private filmeService: FilmeService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];

    if (this.id) {

      this.filmeService.visualizar(this.id)
      .subscribe((filme: Filme) => {
        this.populaFormulario(filme);
      });

    } else {
      this.populaFormulario(this.criaFormularioBranco());
    }

    this.generos = ['Ação', 'Aventura', 'Ficção Científica', 'Romance', 'Terror', 'Drama', 'Biografia', 'História'];

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;

    if (this.id) {
      filme.id = this.id;
      this.editar(filme);
    } else {
      this.cadastro.reset();
      this.salvar(filme);
    }
 }

  private populaFormulario(filme: Filme) {
    this.cadastro = this.fb.group({
      'titulo': [filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      'imagemUrl': [filme.imagemUrl, Validators.minLength(10)],
      'dtLancamento': [filme.dtLancamento, Validators.required],
      'descricao': [filme.descricao],
      'notaIMDb': [filme.notaIMDb, [Validators.required, Validators.min(0), Validators.max(10)]],
      'iMDbUrl': [filme.iMDbUrl, Validators.minLength(10)],
      'genero': [filme.genero, Validators.required]
    });
  }

  private criaFormularioBranco() {
    return {
      titulo: null,
      imagemUrl: null,
      dtLancamento: null,
      descricao: null,
      notaIMDb: 0,
      iMDbUrl: null,
      genero: null
    } as Filme;
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
    };
     this.dialog.open(AlertaComponent, config);
    });
  }

  private editar(filme) {
    this.filmeService.editar(filme).subscribe(() => {
      const config = {
        data: {
          descricao: 'Seu registrofoi atualizado!',
          txtBtnSucesso: 'Ir para a listagem'
        }
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => {
        this.router.navigateByUrl('filmes');
      });
    },
    () => {
      const config = {
        data: {
          titulo: 'Filme não atualizado',
          descricao: 'Não foi possível editar o filme, por favor tente mais tarde.',
          txtBtnSucesso: 'OK',
          colorBtnSucesso: 'warn'
        }
      };
      this.dialog.open(AlertaComponent, config);
    });
  }
}