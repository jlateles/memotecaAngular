import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrl: './editar-pensamento.component.css'
})
export class EditarPensamentoComponent implements OnInit {

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: ''
  }

  editarPensamento(){
      this.service.editar(this.pensamento).subscribe(()=>{
        this.router.navigate(['/listarPensamento'])
      })
  }

  cancelar(){
    this.router.navigate(['/listarPensamento'])
  }

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute
    ){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    this.service.buscarPorID(parseInt(id!)).subscribe((pensamento)=>{
      this.pensamento = pensamento
    })
  }
}
// atualizado
