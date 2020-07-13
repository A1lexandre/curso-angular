import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FilmeService } from './../../core/filme.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  filme: Filme;
  id: number;

  constructor(private filmeService: FilmeService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  private visualizar() {

      this.filmeService.visualizarFilme(
        this.activatedRoute.snapshot.params['id']
      ).subscribe((filme: Filme) => {
        this.filme = filme;
      });
    }
  }


