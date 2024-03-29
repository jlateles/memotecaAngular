import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pensamento } from './pensamento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PensamentoService {

  private readonly API = 'http://localhost:3000/pensamento'

  constructor(private http: HttpClient) { }

  listar(pagina: number, filtro: string, favoritos: boolean): Observable<Pensamento[]> {

    const itensPorPagina = 5;
    let params = new HttpParams()
    .set("_page", pagina)
    .set("_limit", itensPorPagina)

    if(filtro.trim().length  > 2 ){
      params = params.set("q", filtro)
    }

    if(favoritos){
      params = params.set("favorito", true)
    }


   // return this.http.get<Pensamento[]>( `${this.API}?_page=${pagina}&_limit=${itensPorPagina}`)  / não é uma boa prática
    return this.http.get<Pensamento[]>(this.API,{ params }) // não funcionou com a classe httpParams
  }

  criar(pensamento: Pensamento): Observable<Pensamento>{
    return this.http.post<Pensamento>(this.API, pensamento)
  }

  editar(pensamento: Pensamento): Observable<Pensamento>{
    const url  = `${this.API}/${pensamento.id}`
    return this.http.put<Pensamento>(url, pensamento)
  }

    mudarFavorito(pensamento: Pensamento): Observable<Pensamento>{
    pensamento.favorito =!pensamento.favorito
    const url = `${this.API}/${pensamento.id}` /// poderia usar apenas return this.editar(pensamento) pq as linhas 21-42 são iguais as 35-36
    return this.http.put<Pensamento>(url, pensamento)
  }

  excluir(id: string): Observable<Pensamento>{
    const url = `${this.API}/${id}`
    return this.http.delete<Pensamento>(url)
  }

  buscarPorID(id: string): Observable<Pensamento>{
    const url = `${this.API}/${id}`
    return this.http.get<Pensamento>(url)
  }


}
