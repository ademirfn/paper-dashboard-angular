import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/data.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-userunidades',
  templateUrl: './userunidades.component.html',
  styleUrls: ['./userunidades.component.scss']
})
export class UserunidadesComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getStatusData().subscribe(data => {
      console.log(data);
      this.createStatusChart(data, 'statusChart', 'Status Chart 1');
    });

    this.dataService.getStatusUnit2Data().subscribe(data => {
      console.log(data);
      this.createStatusChart(data, 'statusChartUnit2', 'Status Chart 2');
    });
  }

  createStatusChart(data: any, chartId: string, chartLabel: string) {
    const labels = data.map((d: any) => d.mes);
    const ativosData = data.map((d: any) => d.Ativos);
    const inativosData = data.map((d: any) => d.Inativos);
    const totaisData = data.map((d: any) => d.Total || d.Totais); // Adjust for different keys

    new Chart(chartId, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Ativos',
            data: ativosData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
          {
            label: 'Inativos',
            data: inativosData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          },
          {
            label: 'Totais',
            data: totaisData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

}
