import { Pensamento } from './../pensamento';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-excluir-pensamento',
  templateUrl: './excluir-pensamento.component.html',
  styleUrl: './excluir-pensamento.component.css'
})
export class ExcluirPensamentoComponent implements OnInit {

  pensamento: Pensamento= {
    id: '',
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  constructor(private service: PensamentoService,
    private Router: Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
     const id = this.route.snapshot.paramMap.get('id')
     this.service.buscarPorID(id!).subscribe((pensamento) => {
      this.pensamento = pensamento
     })
  }

  excluirPensamento(){
    if(this.pensamento.id){
      this.service.excluir(this.pensamento.id).subscribe(() =>{
        this.Router.navigate(['/listarPensamento'])
      })
    }
  }

  cancelar(){
    this.Router.navigate(['/listarPensamento'])
  }


} // final
