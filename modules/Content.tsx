import { GelBooruPost } from "@/constants/Amoops";

export interface CompressedContent {
    // for faster assembly 
    width_c?:   number;
    height_c?:  number;
    // compressed content url
    curl_c?:    string;
}

export class Content {
    // can be the MD5 of the content or just the id from gelbooru
    id:         string;

    // for faster assembly, prevent to do more step when creating a post
    type:       'video' | 'image';
    width:      number;
    height:     number;
    // content url (http://example/content/1234.png)
    curl:       string;

    tags?:      string[];
    date?:      string;

    compressed?:CompressedContent;

    constructor(id: string, type: 'video' | 'image', width: number, height: number, curl: string, tags?: string[], date?: string, compressed?: CompressedContent) {
        this.id = id;
        this.type = type;
        this.width = width;
        this.height = height;
        this.curl = curl;
        this.tags = tags;
        this.date = date;
        this.compressed = compressed;
    }

    public static parse_gelbooru_post(post: GelBooruPost) 
    {
        return new Content(
            post.md5,
            post.file_url.split('.').pop() === 'mp4' ? 'video' : 'image',
            post.width, 
            post.height, 
            post.file_url,
            post.tags.split(' '),
            post.created_at,
            {
                curl_c: post.sample_url,
                width_c: post.sample_width,
                height_c: post.sample_height
            }
        )
    }
}