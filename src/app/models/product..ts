export class Product {
    id?: any;
    nom?:string;
    description?:string;
    prix?:number;
    published?:boolean;
    _links?:Links;
}

export class Links {
    first?: {href: string};
    self?: {href: string};
    next?: {href: string};
    last?: {href: string};
    profile?: {href: string};
    search?: {href: string};
  }
