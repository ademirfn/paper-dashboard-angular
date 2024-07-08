import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType, TooltipItem } from 'chart.js';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-totaldown',
  templateUrl: './totaldown.component.html',
  styleUrls: ['./totaldown.component.scss']
})
export class TotaldownComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: (tooltipItem: TooltipItem<'bar' | 'line'>) => {
            const datasetLabel = tooltipItem.dataset.label || '';
            if (datasetLabel === 'Total') {
              return `Total: ${tooltipItem.formattedValue}`;
            }
            return `${datasetLabel}: ${tooltipItem.formattedValue}`;
          }
        }
      }
    }
  };
  public barChartLabels: string[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataset<'bar' | 'line'>[] = [
    { data: [], label: 'iOS', type: 'bar' },
    { data: [], label: 'Android', type: 'bar' },
    { data: [], label: 'Total', type: 'line' }
  ];

  public chartData: {ios: number, android: number, total: number, label: string}[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadChartData();
  }

  loadChartData() {
    this.http.get<{ios: number, android: number, total: number, label: string}[]>('assets/dados.json')
      .subscribe(data => {
        this.chartData = data;
        this.barChartLabels = data.map(item => item.label);
        this.barChartData[0].data = data.map(item => item.ios);
        this.barChartData[1].data = data.map(item => item.android);
        this.barChartData[2].data = data.map(item => item.total);
      });
  }

}
