import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface PushData {
  mes: string;
  unidade: string;
  total_logins: string;
}
interface TelaData {
  mes: string;
  titulo: string;
  total_registros: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'assets/ativos.json';

  private jsonUrl = 'assets/engajanoticias.json';
  private jsonUrlLogins = 'assets/pelomenos1.json';
  private totalAccessJsonUrl = 'assets/liberados.json';
  private downloadsJsonUrl = 'assets/downloads.json';
  private statusJsonUrl = 'assets/ativoinativosmpsa.json';
  private statusUnit2JsonUrl = 'assets/ativosinativosaln.json';


  constructor(private http: HttpClient) { }

  getNoticias(): Observable<any[]> {
    return this.http.get<any[]>(this.jsonUrl).pipe(
      map(data => {
        return data.map(item => {
          return { ...item, mes: new Date(item.mes) };
        });
      })
    );
  }

  getAvisos(): Observable<any[]> {
    return this.http.get<any[]>('assets/engajaavisos.json').pipe(
      map(data => {
        return data.map(item => {
          return { ...item, mes: new Date(item.mes) };
        });
      })
    );
  }

  getUnidadesData(): Observable<any[]> {
    return this.http.get<PushData[]>(this.url).pipe(
      map(data => data.map(item => ({
        ...item,
        total_logins: parseInt(item.total_logins, 10)
      })))
    );
  }
  getTelasData(): Observable<any[]> {
    return this.http.get<TelaData[]>('assets/telas.json').pipe(
      map(data => data.map(item => ({
        ...item,
        total_registros: parseInt(item.total_registros, 10)
      })))
    );
  }

  getLoginData(): Observable<any> {
    return this.http.get<any>(this.jsonUrlLogins);
  }

  getTotalAccessData(): Observable<any> {
    return this.http.get<any>(this.totalAccessJsonUrl);
  }

  getDownloadsData(): Observable<any> {
    return this.http.get<any>(this.downloadsJsonUrl);
  }

  getStatusData(): Observable<any> {
    return this.http.get<any>(this.statusJsonUrl);
  }

  getStatusUnit2Data(): Observable<any> {
    return this.http.get<any>(this.statusUnit2JsonUrl);
  }
}
