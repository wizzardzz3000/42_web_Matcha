export interface GetTagsReturn {
  success: boolean;
  message: string;
  tags: Tag[];
}

export interface Tag {
  id_tag: number;
  tag: string;
  label: string;
  logo: string;
}
