import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'lastConnectedFormat' })

export class LastConnectedTimeFormatPipe implements PipeTransform {
    transform(connectedTime: Date, ...args): string {
        let elapsed = (Date.now() - +new Date(connectedTime)) / 60000;
        let time = '';

        if (elapsed < 1) {
            return('just now');
        } else if (elapsed < 60) {
            time = ' minutes ago';
        } else if ((elapsed /= 60) < 24) {
            time = ' hours ago';
        } else if ((elapsed /= 24) < 30) {
            time = ' days ago';
        } else { return 'A long time ago..'; }

        return Math.round(elapsed) + time;
    }
}
