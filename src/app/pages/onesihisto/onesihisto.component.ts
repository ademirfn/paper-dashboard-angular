import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartOptions, ChartType } from 'chart.js';
//import { Color } from 'ng2-charts';

// Declare a new interface to extend Chart.js types
interface ExtendedChart extends Chart {
  helpers?: {
    fontString: (fontSize: number, fontStyle: string, fontFamily: string) => string;
  };
}

@Component({
  selector: 'app-onesihisto',
  templateUrl: './onesihisto.component.html',
  styleUrls: ['./onesihisto.component.scss']
})
export class OnesihistoComponent implements OnInit {
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 500
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw.toString();
          }
        }
      }
    }
  };
  public barChartType: ChartType = 'bar';

  public barChartData: ChartConfiguration['data'] = {
    labels: ['mar-23', 'abr-23', 'mai-23', 'jun-23', 'jul-23', 'ago-23', 'set-23', 'out-23', 'nov-23', 'dez-23', 'jan-24', 'fev-24', 'mar-24'],
    datasets: [
      {
        data: [2993, 3056, 3128, 3242, 3333, 3389, 3473, 3553, 2214, 2246, 2282, 2335, 2368],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  public barChartPlugins = [{
    id: 'topLabels',
    afterDatasetsDraw: function(chart: ExtendedChart) {
      const ctx = chart.ctx;
      chart.data.datasets.forEach(function(dataset, i) {
        const meta = chart.getDatasetMeta(i);
        if (!meta.hidden) {
          meta.data.forEach(function(element, index) {
            // Draw the text in black, with the specified font
            ctx.fillStyle = 'rgb(0, 0, 0)';
  
            const fontSize = 12;
            const fontStyle = 'normal';
            const fontFamily = 'Helvetica Neue';
  
            // Check if chart.helpers is defined
            if (chart.helpers) {
              ctx.font = chart.helpers.fontString(fontSize, fontStyle, fontFamily);
            } else {
              // Fallback method to set font
              ctx.font = `${fontStyle} ${fontSize}px ${fontFamily}`;
            }
  
            // Just naively convert to string for now
            const dataString = dataset.data[index].toString();
  
            // Make sure alignment settings are correct
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
  
            const padding = 5;
            // Pass the argument useFinalPosition
            const position = element.tooltipPosition(true); // Adjust as needed
            ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
          });
        }
      });
    }
  }];
  


  constructor() { }

  ngOnInit(): void {
  }



}
