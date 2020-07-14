import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Alerta } from '../../models/alerta';

@Component({
  selector: 'dio-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  alerta = {
  titulo: 'Sucesso',
  descricao: 'Seu registro foi salvo com sucesso!',
  txtBtnSucesso: 'OK',
  txtBtnCancelar: 'Cancelar',
  corBtnSucesso: 'accent',
  corBtnCancelar: 'primary',
  possuirBtnFechar: false, } as Alerta;

  constructor( public dialogRef: MatDialogRef<AlertaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Alerta) {}

    ngOnInit() {
      if (this.data) {
        this.alerta.titulo = this.data.titulo || this.alerta.titulo;
        this.alerta.descricao = this.data.descricao || this.alerta.descricao;
        this.alerta.txtBtnSucesso = this.data.txtBtnSucesso || this.alerta.txtBtnSucesso;
        this.alerta.txtBtnCancelar = this.data.txtBtnCancelar || this.alerta.txtBtnCancelar;
        this.alerta.corBtnSucesso = this.data.corBtnSucesso || this.alerta.corBtnSucesso;
        this.alerta.corBtnCancelar = this.data.corBtnCancelar || this.alerta.corBtnCancelar;
        this.alerta.possuirBtnFechar = this.data.possuirBtnFechar || this.alerta.possuirBtnFechar;
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }


}
