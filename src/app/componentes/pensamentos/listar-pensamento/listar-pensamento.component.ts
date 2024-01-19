import { Component, OnInit, HostListener } from '@angular/core';
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

  // código para o botão de voltar ao topo
  mostrarBotaoTopo: boolean = false;

  constructor(
    private service: PensamentoService,
    private router: Router){}



  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollPosition = window.scrollY  || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight || 0;
    const bodyHeight = document.body.scrollHeight || document.documentElement.scrollHeight || 0;

    this.mostrarBotaoTopo = scrollPosition > bodyHeight - windowHeight - 200;
  }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favoritos).subscribe((listaPensamentos) => {
      this.listaPensamentos = listaPensamentos
    });
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

  voltarAoTopo(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

} // final


// GET /post?q=internet
