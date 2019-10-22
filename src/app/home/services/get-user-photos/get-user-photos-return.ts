export interface GetUserPhotosReturn {
  success: true;
  message: string;
  photos: Photo[];
}

export interface Photo {
  id_photo: number;
  id_user: number;
  photo: string;
  active: boolean;
  ts: number;
}
