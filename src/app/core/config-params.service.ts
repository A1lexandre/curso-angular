import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { ConfigParams } from './../shared/models/config-params';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configurarParametros(config: ConfigParams): HttpParams {
    let params = new HttpParams();
    if (config.pagina) {
      params = params.set('_page', config.pagina.toString());
    }
    if (config.limite) {
      params = params.set('_limit', config.limite.toString());
    }
    if (config.pesquisa) {
      params = params.set('q', config.pesquisa);
    }
    if (config.campo) {
      params = params.set('genero', config.campo.valor);
    }
    // parametros que são padrões na rota de filmes
    // _sort que ordenar os regitros baseando-se numa propriedade do objeto
    // e _order que define se a ordem e descendente ou ascendente
    params = params.set('_sort', 'id');
    params = params.set('_order', 'desc');

    return params;

  }
}
