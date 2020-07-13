import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { debounceTime } from 'rxjs/operators';

import { FilmeService } from './../../core/filme.service';
import { Filme } from 'src/app/shared/models/filme';
import { ConfigParams } from './../../shared/models/config-params';


@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  semFoto = 'https://www.arteshowestruturas.com.br/wp-content/uploads/sites/699/2017/01/SEM-IMAGEM-13.jpg';

  config = {
    pagina: 0,
    limite: 4,
  } as ConfigParams;

  filmes: Filme[] = [];
  filtragem: FormGroup;
  generos: Array<string>;

  constructor(private fb: FormBuilder,
              private filmeService: FilmeService,
              private router: Router) { }

  ngOnInit(): void {
    this.filtragem = this.fb.group({
      txtPesquisa: [''],
      genero: ['']
    });

    this.filtragem.get('txtPesquisa').valueChanges.pipe(debounceTime(400))
     .subscribe((val: string) => {
      this.config.pesquisa = val;
      this.reinicializarconsulta();
    });

    this.filtragem.get('genero').valueChanges.pipe(debounceTime(400))
     .subscribe((val: string) => {
      this.config.campo = {tipo: 'genero', valor: val };
      this.reinicializarconsulta();
    });

    this.generos = ['Ação', 'Aventura', 'Ficção Científica', 'Romance', 'Terror', 'Drama', 'Biografia', 'História'];

    this.listarFilmes();
  }

  onScroll(): void {
    this.listarFilmes();
  }

  abrir(id: number): void {
    this.router.navigateByUrl('filmes/' + id);
  }

  private listarFilmes(): void {
    this.config.pagina++;
    this.filmeService.listar(this.config).subscribe((filmes: Filme[]) => {
      this.filmes.push(...filmes);
    });
  }

  private reinicializarconsulta() {
    this.config.pagina = 0;
    this.filmes = [];
    this.listarFilmes();
  }

}
