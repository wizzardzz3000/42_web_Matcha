import { Component, OnInit } from '@angular/core';
import { PopulateReturn } from './services/populate.return';
import { PopulateService } from './services/populate.service';
import * as $ from 'jquery';

declare var $: any;

@Component({
  selector: 'app-populate',
  templateUrl: './populate.component.html',
  styleUrls: ['./populate.component.scss']
})
export class PopulateComponent implements OnInit {
  public progress = false;
  public nbUser: number;
  public resolvePopulate: PopulateReturn;
  public photoUrl: string;

  async populate() {
    this.progress = true;
    for (let index = 1; index <= this.nbUser; index++) {
      await this.populateService.populate()
        .subscribe((result: PopulateReturn) => {
          if (result.success) {
            this.resolvePopulate = result;
            this.photoUrl = result.photoUrl;
            $('.progress-bar').css({
              width: Math.floor((index / this.nbUser) * 100) + '%'
            });
            setTimeout(() => {
              index++;
            }, 10);
          }
        });
    }
  }

  constructor(public populateService: PopulateService) { }

  ngOnInit() {
  }

}
