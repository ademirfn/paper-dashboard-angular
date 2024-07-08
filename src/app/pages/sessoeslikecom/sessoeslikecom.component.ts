import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/data.service';

@Component({
  selector: 'app-sessoeslikecom',
  templateUrl: './sessoeslikecom.component.html',
  styleUrls: ['./sessoeslikecom.component.scss']
})
export class SessoeslikecomComponent implements OnInit {
  dadosFormatados: any[] = [];
  titulos: string[] = [];

  dadosFormatadosAvisos: any[] = [];
  titulosAvisos: string[] = [];



  constructor(private noticiasService: DataService) { }

  ngOnInit(): void {
    this.noticiasService.getNoticias().subscribe(data => {
      this.formatarDados(data);
    });
    this.noticiasService.getAvisos().subscribe(data => {
      this.formatarDadosAvisos(data);
    })
  }

  formatarDados(data: any[]): void {
    const meses = new Map<string, any>();

    data.forEach(item => {
      const key = item.mes.toISOString().slice(0, 7); // Agrupa por ano e mês
      if (!meses.has(key)) {
        meses.set(key, {});
      }
      meses.get(key)[item.titulo] = item.total_registros;
      if (!this.titulos.includes(item.titulo)) {
        this.titulos.push(item.titulo);
      }
    });

    this.dadosFormatados = Array.from(meses, ([mes, valores]) => ({ mes, ...valores }));
    console.log(this.dadosFormatados);
  }

  formatarDadosAvisos(data: any[]): void {
    const meses = new Map<string, any>();

    data.forEach(item => {
      const key = item.mes.toISOString().slice(0, 7); // Agrupa por ano e mês
      if (!meses.has(key)) {
        meses.set(key, {});
      }
      meses.get(key)[item.titulo] = item.total_registros;
      if (!this.titulosAvisos.includes(item.titulo)) {
        this.titulosAvisos.push(item.titulo);
      }
    });

    this.dadosFormatadosAvisos = Array.from(meses, ([mes, valores]) => ({ mes, ...valores }));
    console.log(this.dadosFormatadosAvisos);
  }
} 
