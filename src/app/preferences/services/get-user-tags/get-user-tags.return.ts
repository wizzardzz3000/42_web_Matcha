export interface GetUserTagsReturn {
    success: boolean;
    message: string;
    userTags: UserTag[];
}

export interface UserTag {
    id_utag: number;
    id_tag: number;
    id_user: number;
    label: string;
    tag: string;
}