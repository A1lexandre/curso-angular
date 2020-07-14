import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { FilmeService } from './../../core/filme.service';
import { Filme } from 'src/app/shared/models/filme';
import { AlertaComponent } from './../../shared/components/alerta/alerta.component';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {

  filme: Filme;
  id: number;

  constructor(public dialog: MatDialog,
              private filmeService: FilmeService,
              private activatedRoute: ActivatedRoute, 
              private router: Router) { }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  private visualizar() {

      this.filmeService.visualizar(this.id).subscribe((filme: Filme) => {
        this.filme = filme;
      });
    }

  private editar(): void {
    this.router.navigateByUrl('filmes/cadastro/' + this.filme.id);
  }

  private excluir(): void {
    const config = {
      data: {
        titulo: 'Você realmente deseja excluir o filme?',
        descricao: 'Se sim, clique em OK',
        corBtnSucesso: 'warn',
        corBtnCancelar: 'primary',
        possuirBtnFechar: true
      }
    };
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe((resp) => {
      if (resp) {
        this.filmeService.excluir(this.id).subscribe(() => {
          this.router.navigateByUrl('filmes');
        });
      }
    });

  }

  }
