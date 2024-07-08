import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DatePipe } from '@angular/common';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-acessosessoes',
  templateUrl: './acessosessoes.component.html',
  styleUrls: ['./acessosessoes.component.scss']
})
export class AcessosessoesComponent implements OnInit {
  public barChartType: ChartType = 'bar';
  public barChartData: ChartData<'bar'>;
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };

  constructor(private dataService: DataService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.dataService.getTelasData().subscribe(data => {
      const groupedData = this.groupDataByMonth(data);
      const titles = this.extractUniqueTitles(data);

      this.barChartData = {
        labels: Object.keys(groupedData).map(month => this.datePipe.transform(month, 'MMM/yy')),
        datasets: titles.map(title => ({
          label: title,
          data: Object.keys(groupedData).map(month => groupedData[month][title] || 0),
          backgroundColor: this.getRandomColor(),
          borderColor: this.getRandomColor(),
          borderWidth: 1
        }))
      };
    });
  }

  private groupDataByMonth(data: any[]): any {
    return data.reduce((acc, curr) => {
      if (!acc[curr.mes]) {
        acc[curr.mes] = {};
      }
      if (!acc[curr.mes][curr.titulo]) {
        acc[curr.mes][curr.titulo] = 0;
      }
      acc[curr.mes][curr.titulo] += curr.total_registros;
      return acc;
    }, {});
  }

  private extractUniqueTitles(data: any[]): string[] {
    const titles = new Set(data.map(item => item.titulo));
    return Array.from(titles);
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

}
