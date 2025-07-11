export interface TabData {
    title: string;
    description?: string;
    link?: string;
}
   
export interface Content {
    structureId: number;
    data: TabData[];
}

interface Links{
    github:string
    linkedin:string
    mail:string
}

export interface HeaderData{
    name:string
    email:string
    links?:Links
    skills?:string[]
    description?:string
}

export interface SiteData{
    name:string
    wildcard:string
    email:string
    templateId:number
    links?:Links
    tabs:string[]
    skills?:string[]
    description?:string
    color?:string
    content?: {
        [key: string]: Content;
      };

}