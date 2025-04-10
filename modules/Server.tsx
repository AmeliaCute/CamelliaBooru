import { Content } from "./Content";
import { XMLParser } from 'fast-xml-parser'

export class Server {
    type:   'gelbooru2.0'  | 'gelbooru2.5' | 'amoops';
    name:   string;
    url:    string;
    key?:   string;
    id?:    string;

    icon?:  string;
    tagsAvaible?: string[] = [];
    
    // used for random content
    valid?: boolean;
    isdefault?: boolean;

    gelbooru_latest_offset: number = 0;
    gelbooru_explore_offset: number = 0;

    constructor (stype: 'gelbooru2.0'  | 'gelbooru2.5' | 'amoops', name: string, url: string, key?: string , id?: string, isdefault?: boolean) {
        this.type = stype;
        this.name = name;
        this.url = url;
        this.isdefault = isdefault;

        if (key) this.key = key;
        if (id) this.id = id;
        this.tagsAvaible = [];

        if(stype !== 'amoops') return;

        this.gelbooru_latest_offset = 0;
        this.gelbooru_explore_offset = 0;
    }

    async load() {
        switch (this.type) {
            case 'gelbooru2.0':
                return await this.gelbooru20_load();
            case 'amoops':
                return this.amoops_load();
            default:
                throw new Error('Unsupported server type');
        }
    }

    private async amoops_load() {
        // Placeholder for 'amoops' loading logic
        // since amoops is being rework i need time to implement a proper logic for it
        console.log("Loading Amoops server...");
    }

    private async gelbooru20_load() {
        const response = await fetch(`${this.url}/index.php?page=dapi&s=post&q=index&json=1&limit=1`);
        if (response.ok) {
            console.log("Loading Gelbooru server... [", this.name, "]");
            const data = await response.json();
            this.valid = true;
            this.gelbooru_latest_offset = 0;

            await this.gelbooru_getIcon();

            return true;
        } else {
            this.valid = false;
            return false;
        }
    }
    private async gelbooru_getIcon() {
        try {
            const response = await fetch(`${this.url}/favicon.ico`);
            if (response.ok) {
                this.icon = `${this.url}/favicon.ico`;
            } else {
            }
        } catch (error) {
            console.log("Error fetching favicon:", error);
        }
    }

    // Probably missing something here DO NOT USE THIS
    private async gelbooru20_getTags(prefix: string) {
        const tagsAvaible: string[] = [];
        let page = 0;
        let hasMore = true;
        
        const parser = new XMLParser();
        
        try {
            while (hasMore) {
                const response = await fetch(
                    `${this.url}/index.php?page=dapi&s=tag&q=index&name_pattern=${prefix}%&pid=${page}`
                );
        
                if (response.ok) {
                    const contentType = response.headers.get('Content-Type')?.toLowerCase();
                    const responseText = await response.text();

                    if (contentType && contentType.includes('application/json')) {
                        try {
                            const tags = JSON.parse(responseText).tag;
                            if (tags?.length > 0) {
                                tagsAvaible.push(tags.map((tag: any) => tag.name));
                                page++;
                            } else {
                                hasMore = false;
                            }
                        } catch (jsonError) {
                            console.error("Error parsing JSON:", jsonError);
                            hasMore = false;
                        }
        
                    } else if (contentType && (contentType.includes('application/xml') || contentType.includes('<?xml version="1.0"?>') || contentType.includes('text/xml;charset=utf-8'))) {
                        try {
                            const jsonObj = parser.parse(responseText);

                            if (jsonObj?.tags) {
                                const tagsArray = jsonObj.tags.tag ? 
                                    (Array.isArray(jsonObj.tags.tag) ? jsonObj.tags.tag : [jsonObj.tags.tag]) 
                                    : [];
        
                                tagsArray.forEach((tag: any) => {
                                    tagsAvaible.push(tag.name);
                                });

                                
                                console.log(tagsArray);
                                page++;
                            }
                            else if (jsonObj?.tag) {
                                const tagsArray = jsonObj.tag.tag ? 
                                    (Array.isArray(jsonObj.tag.tag) ? jsonObj.tag.tag : [jsonObj.tag.tag]) 
                                    : []; 
        
                                tagsArray.forEach((tag: any) => {
                                    tagsAvaible.push(tag.name);
                                });

                                page++;
                            } else {
                                hasMore = false;
                            }
                        } catch (xmlError) {
                            console.error("Error parsing XML:", xmlError);
                            hasMore = false;
                        }
                    } else {
                        console.error('Unexpected response format:', contentType, this.name);
                        hasMore = false;
                    }
                } else {
                    console.error('Failed to fetch tags:', response.status, this.name);
                    hasMore = false;
                }
            }
        
            this.tagsAvaible = tagsAvaible;
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    }
    
    async gelbooru20_getPost(id: number) {
        const response = await fetch(
            `${this.url}/index.php?page=dapi&s=post&q=index&id=${id}&json=1`
        );
        if (response.ok) {
            return Content.parse_gelbooru_post(await response.json());
        } else {
            throw new Error('Failed to fetch post');
        }
    }

    async gelbooru20_getLatestPost() {
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

    async gelbooru20_getLatestsPosts(limit: number) {
        const offset = this.gelbooru_latest_offset;
        console.log(offset)
        
        const response = await fetch(
            `${this.url}/index.php?page=dapi&s=post&q=index&json=1&limit=${limit}&pid=${offset}`
        );
        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
                const posts: Content[] = data.map(post => Content.parse_gelbooru_post(post));
                this.gelbooru_latest_offset ++;
                return posts;
            } else if (data && data.post) {
                const posts: Content[] = data.post.map((post: any) => Content.parse_gelbooru_post(post));
                this.gelbooru_latest_offset ++; 
                return posts;
            } else {
                throw new Error('Fetched data is not an array');
            }
        } else {
            throw new Error('Failed to fetch latest posts');
        }
    }
    async gelbooru20_searchPosts(tags: string, limit = 10) {
     
        const offset = this.gelbooru_explore_offset;
        console.log(offset)
    
        const response = await fetch(
            `${this.url}/index.php?page=dapi&s=post&q=index&json=1&tags=${encodeURIComponent(tags)}&limit=${limit}&pid=${offset}`
        );

        if (response.ok) {
            const data = await response.json();
            if (Array.isArray(data)) {
                const posts: Content[] = data.map(post => Content.parse_gelbooru_post(post));
    
                this.gelbooru_explore_offset ++;
                return posts;
            } else if (data && data.post) {
                const posts: Content[] = data.post.map((post: any) => Content.parse_gelbooru_post(post));

                this.gelbooru_explore_offset ++; 
                return posts;
            } else {
                console.error('Fetched data is not an array');
            }
        } else {
            console.error(response.statusText); 
        }
    }
}