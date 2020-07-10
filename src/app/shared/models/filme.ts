export interface Filme {
  id?: number;
  titulo: string;
  imagemUrl?: string;
  dtLancamento: Date;
  descricao?: string;
  notaIMDb: number;
  iMDbUrl?: string;
  genero: string;
}