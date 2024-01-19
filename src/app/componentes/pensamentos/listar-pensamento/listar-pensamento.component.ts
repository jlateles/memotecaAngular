import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrl: './listar-pensamento.component.css'
})
export class ListarPensamentoComponent implements OnInit {

  listaPensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favoritos: boolean = false;
  listaFaoritos: Pensamento[] = [];
  titulo: string = 'Mural';


  constructor(
    private service: PensamentoService,
    private router: Router){}

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    })
  }

  carregarMaisPensamentos(){
    this.service.listar(++this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listaPensamentos => {
      this.listaPensamentos.push(...listaPensamentos);
      if(!listaPensamentos.length){
        this.haMaisPensamentos = false
      }
    })
  }

  pesquisarPensamentos(){

      this.haMaisPensamentos = true;
      this.paginaAtual = 1;
      this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
        .subscribe(listaPensamentos => {
          this.listaPensamentos = listaPensamentos;
        })
    }


 recarregarComponente(){
    // location.reload(); // esse método faz com que toda página seja recarregada, não prático para uma aplicação

    this.favoritos = false;
    this.paginaAtual = 1;
    this.router.navigate([this.router.url])
    }

  listarFavoritos() {
    this.titulo = 'Favoritos'
    this.favoritos = true;
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos)
    .subscribe(listaPensamentosFavoritos => {
      this.listaPensamentos = listaPensamentosFavoritos;
      this.listaFaoritos = listaPensamentosFavoritos;
    })
  }


} // final


// GET /post?q=internet
