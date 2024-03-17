export interface MenuItem {
    id: number;
    title?: string;
    description?: string;
    regular_price?: string;
    discount_price?: string | null;
    product_image?: ProductImage[];
    slug: string;
    selectedSpecification?: { // Добавляем выбранные спецификации
        specification_name: string;
        value: string;
        price: string;
    };
}

export type CategoriesProps = {
    title: string
    category: string
}

// export interface ProductImage {
//     image: string;
//     alt_text?: string | null;
// }

// export interface Product {
//     id: number;
//     title: string;
//     description?: string;
//     regular_price?: string;
//     discount_price?: string | null;
//     slug?: string;
//     weight?: number
//     selectedSpecification?: { // Добавляем выбранные спецификации
//         specification_name: string;
//         value: string;
//         price: string;
//     };
//     specifications?: Specifications[]
//     product_image?: ProductImage[];
//     // category: number; // Если вам не нужен ID категории, можно опустить
//     quantity?: number
// }

export type Specifications = {
    specification_name: string
    value: string
    price: string | number

}

// export interface Category {
//     id: number;
//     name: string;
//     slug: string;
//     is_active: boolean;
//     products: Product[];
// }




export type ProductImage = {
    image: string;
    alt_text: string | null;
};


// export type Specification = {
//     specification_name: string;
//     value: string;
//     price: string;
// };

export type Attribute = {
    id: number;
    name: string;
    category: number;
};

export type AttributeValue = {
    id: number;
    attribute: Attribute;
    value: string;
    price: string;
};

export type Product = {
    id: number;
    title: string;
    description: string;
    regular_price: string;
    discount_price: string | null;
    slug: string;
    product_image: ProductImage[];
    category: number;
    weight: string | null;
    attribute_values: AttributeValue[];
    selectedAttribute?: AttributeValue;
};

export type CartItem = {
    product: Product;
    quantity: number;


};

export type ProductAttributes = {
    [key: string]: string;
};

export type Category = {
    id: number;
    name: string;
    slug: string;
    products: Product[];
};

