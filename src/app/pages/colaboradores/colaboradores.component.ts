import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.scss']
})
export class ColaboradoresComponent implements OnInit {

  userComents: any = [];
  userLikers: any = [];
  allComents: any = [];
  allLikers: any = [];


  likesOk: boolean = false;
  commentsOk: boolean = false

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.requestMonthlyPostsCommenters().then(res => {
      console.log(res);
      this.userComents = res;
      this.flattenPosts();
    }).finally(() => {
      this.commentsOk = true;
    });

    this.api.requestMonthlyTopLikers().then(res => {
      console.log(res);
      this.userLikers = res;
      this.flattenLikesPosts();
    }).finally(() => {
      this.likesOk = true;
    })
  }

  flattenPosts(): void {
    for (let month in this.userComents) {
      if (this.userComents.hasOwnProperty(month)) {
        this.userComents[month].forEach((post: any) => {
          this.allComents.push({ ...post, month });
        });
      }
    }
  }

  flattenLikesPosts(): void {
    for (let month in this.userLikers) {
      if (this.userLikers.hasOwnProperty(month)) {
        this.userLikers[month].forEach((post: any) => {
          this.allLikers.push({ ...post, month });
        });
      }
    }
  }

}
