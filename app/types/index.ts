export interface Listing {
  _id: string;
  title: string;
  description: string;
  attributes: Record<string, string>;
  price?: number;
  createdAt?: string;
}

export interface Facets {
  [key: string]: string[];
}
