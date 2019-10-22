import { PrefTag } from 'src/app/preferences/services/get-preference-tags/get-preference-tags.return';

export interface GetUserToSwipeParameter {
    id: number;
    interest: string;
    gender: string;
    minage: number;
    maxage: number;
    distance: number;
    popularity: number;
    prefTags: PrefTag[];
}
