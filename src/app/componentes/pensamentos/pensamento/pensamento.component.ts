import { Component, OnInit, Input } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrl: './pensamento.component.css'
})
export class PensamentoComponent implements OnInit {

  @Input() pensamento: Pensamento = {
    id: '',
    conteudo: 'O pouco que sei não dá para compreender a vida, então a explicação está no que desconheço e que tenho a esperança de poder vir a conhecer um pouco mais',
    autoria: 'Clarice Lispector',
    modelo: 'modelo3',
    favorito: false
  }

  @Input() listaFavoritos: Pensamento[] = [];

  constructor( private service: PensamentoService){}

  ngOnInit(): void {

  }

  larguraPensamento(): string {
    if(this.pensamento.conteudo.length >= 256){
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  mudarIconeFavorito(): string {
    if(this.pensamento.favorito == false){
      return 'inativo'
    }
    return 'ativo'
  }

  atualizarFavoritos(){
    this.service.mudarFavorito(this.pensamento).subscribe(() => {
      this.listaFavoritos.splice(this.listaFavoritos.indexOf(this.pensamento), 1)
    });
  }

} // final
