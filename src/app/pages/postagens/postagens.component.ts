import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/services/api.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-postagens',
  templateUrl: './postagens.component.html',
  styleUrls: ['./postagens.component.scss']
})
export class PostagensComponent implements OnInit {
  
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  public comentarios: any = [];
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Comments'
      }
    ]
  };

  postsByMonth: any = {};
  allPosts: any[] = [];

  likesByMonth: any = {};
  allLikesPosts: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.requestMonthlyComments().then(data => {
      this.comentarios = data;
      this.barChartData.labels = data.map(item => item.month);
      this.barChartData.datasets[0].data = data.map(item => item.comment_count);
      this.chart?.update();  // Atualize o gráfico
    }).finally(() => {
      console.log(this.barChartData)
    });

    this.api.requestMonthlyPostsComments().then(res => {
      this.postsByMonth = res;
      this.flattenPosts();
    }).finally(() => {
      console.log(this.postsByMonth)
    });

    this.api.requestMonthlyTopLikes().then(res => {
      this.likesByMonth = res;
      this.flattenLikesPosts();
    }).finally(() => {
      console.log(this.likesByMonth)
    });
  }

  flattenPosts(): void {
    for (let month in this.postsByMonth) {
      if (this.postsByMonth.hasOwnProperty(month)) {
        this.postsByMonth[month].forEach((post: any) => {
          this.allPosts.push({ ...post, month });
        });
      }
    }
  }

  flattenLikesPosts(): void {
    for (let month in this.likesByMonth) {
      if (this.likesByMonth.hasOwnProperty(month)) {
        this.likesByMonth[month].forEach((post: any) => {
          this.allLikesPosts.push({ ...post, month });
        });
      }
    }
  }
}
