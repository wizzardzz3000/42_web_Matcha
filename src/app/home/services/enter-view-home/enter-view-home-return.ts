import { PrefTag } from 'src/app/preferences/services/get-preference-tags/get-preference-tags.return';

export interface EnterViewHomeReturn {
  success: true;
  message: '';
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  bio: string;
  hash: string;
  distance: number;
  minage: number;
  maxage: number;
  gender: string;
  interest: string;
  position: {
    latitude: number,
    longitude: number
  };
  confirm: boolean;
  online: number;
  lastConnection: Date;
  pop: number;
  prefTags: PrefTag[];
}
