import { Component, OnInit } from '@angular/core';
import { DataService } from 'app/services/data.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-acessosliberados',
  templateUrl: './acessosliberados.component.html',
  styleUrls: ['./acessosliberados.component.scss']
})
export class AcessosliberadosComponent implements OnInit {

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getTotalAccessData().subscribe(data => {
      this.createChart(data);
    });

    this.dataService.getDownloadsData().subscribe(data => {
      this.createDownloadsChart(data);
    });
  }

  createChart(data: any) {
    const labels = data.map((d: any) => d.mes);
    const mpsaData = data.map((d: any) => d.MPSA);
    const alnData = data.map((d: any) => d.ALN);

    new Chart("totalAccessChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'MPSA',
            data: mpsaData,
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            borderColor: 'rgba(153, 102, 255, 1)',
            borderWidth: 1
          },
          {
            label: 'ALN',
            data: alnData,
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            borderColor: 'rgba(255, 159, 64, 1)',
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

  createDownloadsChart(data: any) {
    const labels = data.map((d: any) => d.mes);
    const mpsaData = data.map((d: any) => d.MPSA);
    const alnData = data.map((d: any) => d.ALN);

    new Chart("downloadsChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'MPSA',
            data: mpsaData,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'ALN',
            data: alnData,
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            borderColor: 'rgba(255, 206, 86, 1)',
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
