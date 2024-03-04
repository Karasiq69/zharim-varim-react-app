export interface MenuItem {
  id: number;
  title: string;
  description: string;
  regular_price: string;
  discount_price: string | null;
  product_image: ProductImage[];
  slug: string;
}

export type CategoriesProps = {
    title: string
    category: string
}

export interface ProductImage {
  image: string;
  alt_text?: string | null;
}

export interface Product {
  id: number;
  title: string;
  description?: string;
  regular_price?: string;
  discount_price?: string | null;
  slug?: string;
  product_image?: ProductImage[];
  // category: number; // Если вам не нужен ID категории, можно опустить
    quantity?:number
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  is_active: boolean;
  products: Product[];
}


export interface CategoryDisplayProps {
  title: string;
  categories: Category[];
}