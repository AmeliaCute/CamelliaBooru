import { ImageSourcePropType } from "react-native";

export interface User {
    name:   string;
    uid:    string;
    pfp?:   ImageSourcePropType;
}

export interface GelBooruPost {
    id: string;
    md5: string;
    creator_id: string;
    has_children: string;
    created_at: string;
    status: string;
    source: string;
    has_notes: string;
    has_comments: string;
    height: number;
    width:  number;
    score:  string;
    file_url: string;
    parent_id: string;

    sample_url: string;
    sample_width: number;
    sample_height: number;

    preview_url: string;
    preview_width: number;
    preview_height: number;

    rating: string;
    tags: string;
    change: number;

}
