import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {EnterViewHomeReturn} from './services/enter-view-home/enter-view-home-return';
import {EnterViewHomeService} from './services/enter-view-home/enter-view-home.service';
import {map} from 'rxjs/operators';

@Injectable()
export class EnterViewHomeResolve implements Resolve<EnterViewHomeReturn> {

  constructor(public enterViewHomeService: EnterViewHomeService,
              public router: Router) {}

  resolve(route: ActivatedRouteSnapshot) {

    const id = +localStorage.getItem('userId');

    return this.enterViewHomeService.enterView({id}).pipe(
      map(response => {
        return response;
      })
    );
  }
}
