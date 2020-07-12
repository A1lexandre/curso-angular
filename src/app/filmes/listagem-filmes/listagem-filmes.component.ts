import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

import { FilmeService } from './../../core/filme.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  readonly limite = 4;
  pagina = 0;
  filmes: Filme[] = [];
  filtragem: FormGroup;
  generos: Array<string>;

  constructor(private fb: FormBuilder,
              private filmeService: FilmeService) { }

  ngOnInit(): void {
    this.filtragem = this.fb.group({
      nomeFilme: [''],
      genero: ['']
    });

    this.generos = ['Ação', 'Aventura', 'Ficção Científica', 'Romance', 'Terror', 'Drama', 'Biografia', 'História'];

    this.listarFilmes();
  }

  onScroll(): void {
    this.listarFilmes();
  }

  private listarFilmes(): void {
    this.pagina++;
    this.filmeService.listar(this.pagina, this.limite).subscribe((filmes: Filme[]) => {
      this.filmes.push(...filmes);
    });
  }

}
