import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-push',
  templateUrl: './push.component.html',
  styleUrls: ['./push.component.scss']
})
export class PushComponent implements OnInit {
  public pushs: any[] = [];
  public loading: boolean = true;
  public currentPage: number = 0;
  public pageSize: number = 50;
  public total_count: number;

  /* the table reference */
  @ViewChild('userTable') userTable: ElementRef;

constructor(private api: ApiService, private datePipe: DatePipe, /*private exportService: ExportService*/) { }

  ngOnInit(): void {
    this.getPushs(this.currentPage);
  }

  nextPage() {
    console.log(this.totalPages());
    if (this.currentPage < this.totalPages()) {
      this.currentPage = this.currentPage + 50;
      console.log(this.currentPage);
      this.getPushs(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage >= 50) {
      this.currentPage = this.currentPage - 50;
      console.log(this.currentPage);
      this.getPushs(this.currentPage);
    }
  }

  totalPages(): number {
    //return Math.ceil(this.total_count / this.pageSize);
    return this.total_count;
  }
  convertTimestampToDate(timestamp: number): Date {
    return new Date(timestamp * 1000); // O timestamp da API está em segundos, então precisamos multiplicá-lo por 1000 para converter para milissegundos
  }
  formatDate(date: Date): string {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss');
  }

  exportElmToExcel(): void {
   // this.exportService.exportTableElmToExcel(this.userTable, 'pushs');
  }
 


  async getPushs(offset: number) {
    this.loading = true;
    this.pushs = [];
    console.log(this.pushs.length);
    await this.api.requesPushs(offset).then(res => {
      console.log(res);
      this.total_count = res.total_count;
      res.notifications.forEach(element => {
        let date = this.convertTimestampToDate(element.queued_at);
        let formattedDate = this.formatDate(date);
        //console.log(formattedDate);

        let push = {
          titulo: element.headings.en,
          conteudo: element.contents.en,
          platform_delivery_stats: element.platform_delivery_stats,
          total_clicks: element.converted,
          data: formattedDate,
          enviados: element.successful
        }
        this.pushs.push(push);

      });
    }).finally(() => {
      this.loading = false;
      console.log(this.pushs);
    })
  }

}
