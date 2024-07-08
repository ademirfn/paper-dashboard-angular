import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-hubconteudo',
  templateUrl: './hubconteudo.component.html',
  styleUrls: ['./hubconteudo.component.scss']
})
export class HubconteudoComponent implements OnInit {

  chart: any;
  tableData: any[] = [];
  chartData: { labels: string[], data: number[] } | null = null;

  @ViewChild('accessChart') accessChart!: ElementRef;
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('assets/acessos_marco.json').subscribe((data: any) => {
      this.chartData = { labels: data.labels, data: data.data };
      this.initChart();  // Attempt to initialize the chart if tab is already selected
    });

    this.http.get('assets/acessos_por_menu.json').subscribe((data: any) => {
      this.tableData = data;
    });
  }

  ngAfterViewInit() {
    this.tabGroup.selectedTabChange.subscribe(event => {
      if (event.index === 1 && !this.chart && this.chartData) { // Assuming the second tab contains the chart
        this.initChart();
      }
    });
  }

  initChart() {
    if (this.accessChart && this.chartData) {
      this.chart = new Chart(this.accessChart.nativeElement, {
        type: 'bar',
        data: {
          labels: this.chartData.labels,
          datasets: [{
            label: 'Acessos Março',
            data: this.chartData.data,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

  downloadChart() {
    if (this.chart) {
      const link = document.createElement('a');
      link.href = this.chart.toBase64Image();
      link.download = 'grafico_acessos_marco.png';
      link.click();
    }
  }
}
