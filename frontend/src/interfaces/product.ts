export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  original_price: number;
  description: string;
  images: string[];
  specifications: string;
  brand: string;
}

export interface IImage {
  _id?: string;
  base_url: string;
  medium_url: string;
  thumb_url: string;
  url: string;
  url_viewer: string;
}
