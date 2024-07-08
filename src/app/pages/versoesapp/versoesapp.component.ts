import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-versoesapp',
  templateUrl: './versoesapp.component.html',
  styleUrls: ['./versoesapp.component.scss']
})
export class VersoesappComponent implements OnInit {

  public pieChartData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: []
    }]
  };
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false // Ocultar a legenda padrão
      },
      datalabels: {
        display: true,
        color: 'black',
        formatter: (value, context) => {
          return context.chart.data.labels ? context.chart.data.labels[context.dataIndex] : '';
        }
      }
    }
  };
  public pieChartPlugins = [DataLabelsPlugin];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData() {
    this.http.get<any[]>('assets/versoes.json')
      .subscribe(data => {
        const versions = data.map((item: any) => item.versao);
        const users = data.map((item: any) => item.usuarios);

        this.pieChartData = {
          labels: versions,
          datasets: [{
            data: users,
            backgroundColor: this.generateColors(users.length),
          }]
        };
      });
  }

  generateColors(count: number): string[] {
    const baseColor = '#ef8157';
    const colors = [];
    const baseHSL = this.hexToHsl(baseColor);

    for (let i = 0; i < count; i++) {
      const h = baseHSL[0];
      const s = baseHSL[1];
      const l = baseHSL[2] * (0.8 + 0.2 * (i / count)); // Ajustar a luminosidade para variação

      colors.push(`hsl(${h}, ${s}%, ${l}%)`);
    }
    return colors;
  }

  hexToHsl(hex: string): [number, number, number] {
    // Convert HEX to RGB
    let r = parseInt(hex.slice(1, 3), 16) / 255;
    let g = parseInt(hex.slice(3, 5), 16) / 255;
    let b = parseInt(hex.slice(5, 7), 16) / 255;

    // Find min and max values to get luminance
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h: number = 0;
    let s: number;
    let l: number = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return [h * 360, s * 100, l * 100];
  }
}
