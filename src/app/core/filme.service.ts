import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ConfigParams } from './../shared/models/config-params';
import { ConfigParamsService } from './config-params.service';
import { Filme } from './../shared/models/filme';

const url = 'http://localhost:3000/filmes/';

@Injectable({
  providedIn: 'root'
})
export class FilmeService {

  constructor(private http: HttpClient,
              private configParamsService: ConfigParamsService) { }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<Filme>(url, filme);
  }

  listar(config: ConfigParams): Observable<Filme[]> {

    const configParams = this.configParamsService.configurarParametros(config);

    return this.http.get<Filme[]>(url, {params: configParams});
  }

  visualizar(id): Observable<Filme> {
    return this.http.get<Filme>(url + id);
  }

  editar(filme: Filme): Observable<Filme> {
    return this.http.put<Filme>(url + filme.id, filme);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }


}
