import { Component, OnInit } from '@angular/core';

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

  constructor(private filmeService: FilmeService) { }

  ngOnInit(): void {
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
