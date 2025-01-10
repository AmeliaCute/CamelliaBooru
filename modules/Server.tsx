import { Content } from "./Content";

export class Server {
    type:   'gelbooru' | 'amoops';
    name:   string;
    url:    string;
    key?:   string;
    id?:    string;

    // used for random content
    postcount?: number;
    valid?: boolean;
    isdefault?: boolean;

    gelbooru_latest_offset: number = 0;

    constructor (type: 'gelbooru' | 'amoops', name: string, url: string, key?: string , id?: string , postcount?: number, gelbooru_latest_offset?: number, isdefault?: boolean) {
        this.type = type;
        this.name = name;
        this.url = url;
        this.isdefault = isdefault;

        if(type === 'gelbooru')
        {
            this.gelbooru_latest_offset = 0;
        }

        if (key) this.key = key;
        if (id) this.id = id;
        if (postcount) this.postcount = postcount;
        
    }

    async load() {
        switch (this.type) {
            case 'gelbooru':
                return this.gelbooru_load();
            case 'amoops':
                return this.amoops_load();
            default:
                throw new Error('Unsupported server type');
        }
    }

    private async amoops_load() {
        // Placeholder for 'amoops' loading logic
        console.log("Loading Amoops server...");
    }

    private async gelbooru_load() {
        const response = await fetch(`${this.url}/index.php?page=dapi&s=post&q=index&json=1&limit=1`);
        if (response.ok) {
            console.log("Loading Gelbooru server... [", this.name, "]");
            const data = await response.json();
            this.postcount = data.length > 0 ? data[0].postcount : 0;
            this.valid = true;
            this.gelbooru_latest_offset = 0;
            console.log("Server is valid:", this.valid);
        } else {
            this.valid = false;
        }
    }

    async gelbooru_getPost(id: number) {
        const response = await fetch(
            `${this.url}/index.php?page=dapi&s=post&q=index&id=${id}&json=1`
        );
        if (response.ok) {
            return Content.parse_gelbooru_post(await response.json());
        } else {
            throw new Error('Failed to fetch post');
        }
    }

    async gelbooru_getLatestPost() {
        const response = await fetch(
            `${this.url}/index.php?page=dapi&s=post&q=index&json=1&limit=1`
        );
        if (response.ok) {
            const posts = await response.json();
            return posts.length > 0 ? Content.parse_gelbooru_post(posts[0]) : null;
        } else {
            throw new Error('Failed to fetch latest post');
        }
    }

    async gelbooru_getLatestsPosts(limit: number) {
        const offset = this.gelbooru_latest_offset;
    
        const response = await fetch(
            `${this.url}/index.php?page=dapi&s=post&q=index&json=1&limit=${limit}&pid=${offset}`
        );
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
                const posts: Content[] = data.map(post => Content.parse_gelbooru_post(post));
                this.gelbooru_latest_offset += limit;
                return posts;
            } else if (data && data.post) {
                const posts: Content[] = data.post.map((post: any) => Content.parse_gelbooru_post(post));
                this.gelbooru_latest_offset += limit; 
                return posts;
            } else {
                throw new Error('Fetched data is not an array');
            }
        } else {
            throw new Error('Failed to fetch latest posts');
        }
    }
    async gelbooru_searchPosts(tags: string, limit = 10) {
        if (tags.length === 0) {
            return await this.gelbooru_getLatestsPosts(limit);
        }
        const offset = this.gelbooru_latest_offset;
    
        const response = await fetch(
            `${this.url}/index.php?page=dapi&s=post&q=index&json=1&tags=${encodeURIComponent(tags)}&limit=${limit}&pid=${offset}`
        );

        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
                const posts: Content[] = data.map(post => Content.parse_gelbooru_post(post));
                this.gelbooru_latest_offset += limit;
                return posts;
            } else if (data && data.post) {
                const posts: Content[] = data.post.map((post: any) => Content.parse_gelbooru_post(post));
                this.gelbooru_latest_offset += limit; 
                return posts;
            } else {
                throw new Error('Fetched data is not an array');
            }
        } else {
            throw new Error('Failed to fetch latest posts');
        }
    }
}