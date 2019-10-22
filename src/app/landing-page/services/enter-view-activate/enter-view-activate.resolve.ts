import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { EnterViewActivateReturn} from './enter-view-activate-return';
import { EnterViewActivateService } from './enter-view-activate.service';
import { map } from 'rxjs/operators';

@Injectable()
export class EnterViewActivateResolve implements Resolve<EnterViewActivateReturn> {

    constructor(public enterViewActivateService: EnterViewActivateService) {}

    resolve(route: ActivatedRouteSnapshot) {

        const email = route.params.email;

        return this.enterViewActivateService.enterView(email).pipe(
        map(response => {
            return response;
        })
    );
  }
}
