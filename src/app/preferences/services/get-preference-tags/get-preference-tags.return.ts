export interface GetPreferenceTagsReturn {
    success: boolean;
    message: string;
    prefTags: PrefTag[];
}

export interface PrefTag {
    id_tpref: number;
    id_tag: number;
    id_user: number;
    tag: string;
}