import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pushtotais',
  templateUrl: './pushtotais.component.html',
  styleUrls: ['./pushtotais.component.scss']
})
export class PushtotaisComponent implements OnInit {
  public lineChartData: Array<any> = [{ data: [], label: 'Pushs' }];
  public lineChartLabels: Array<any> = [];
  public lineChartOptions: any = {
    responsive: true,
    scales: {
      xAxes: [{
        ticks: {
          beginAtZero: false
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
    plugins: {
      datalabels: {
        display: true,
        color: 'black', // Cor do rótulo
        font: {
          weight: 'bold' // Estilo da fonte
        },
        formatter: (value, context) => {
          return value; // Retorna o valor do ponto
        }
      }
    }
  };
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private http: HttpClient) { }

  ngOnInit(): void { 
    this.http.get<any[]>('assets/pushs.json')
    .subscribe(data => {
      this.lineChartLabels = data.map(item => item.label);
      this.lineChartData[0].data = data.map(item => item.total);
    });
  }

}
