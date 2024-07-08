import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { DatePipe } from '@angular/common';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-ativosinativos',
  templateUrl: './ativosinativos.component.html',
  styleUrls: ['./ativosinativos.component.scss']
})
export class AtivosinativosComponent implements OnInit {
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
    this.dataService.getUnidadesData().subscribe(data => {
      const groupedData = this.groupDataByMonth(data);
      this.barChartData = {
        labels: Object.keys(groupedData),
        datasets: [
          { label: 'Total Mes', data: [], backgroundColor: 'rgba(75, 192, 192, 0.2)', borderColor: 'rgba(75, 192, 192, 1)', borderWidth: 1 },
          { label: 'MPSA', data: [], backgroundColor: 'rgba(153, 102, 255, 0.2)', borderColor: 'rgba(153, 102, 255, 1)', borderWidth: 1 },
          { label: 'ALUNORTE', data: [], backgroundColor: 'rgba(255, 159, 64, 0.2)', borderColor: 'rgba(255, 159, 64, 1)', borderWidth: 1 }
        ]
      };

      for (let month in groupedData) {
        //this.barChartData.labels.push(this.datePipe.transform(month, 'MMM/yy'));
        this.barChartData.datasets[0].data.push(groupedData[month]['Total Mes'] || 0);
        this.barChartData.datasets[1].data.push(groupedData[month]['MPSA'] || 0);
        this.barChartData.datasets[2].data.push(groupedData[month]['ALUNORTE'] || 0);
      }
    });

    this.dataService.getLoginData().subscribe(data => {
      this.createChart(data);
    });
  }
  createChart(data: any) {
    const labels = data.map((d: any) => d.mes);
    const totalData = data.map((d: any) => d.Total);
    const mpsaData = data.map((d: any) => d.MPSA);
    const alnData = data.map((d: any) => d.ALN);

    new Chart("loginChart", {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Total',
            data: totalData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          },
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

  private groupDataByMonth(data: any[]): any {
    return data.reduce((acc, curr) => {
      if (!acc[curr.mes]) {
        acc[curr.mes] = { 'Total Mes': 0, 'MPSA': 0, 'ALUNORTE': 0 };
      }
      acc[curr.mes][curr.unidade] += curr.total_logins;
      return acc;
    }, {});
  }

}
