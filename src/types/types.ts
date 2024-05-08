

export interface MenuItem {
    id: number;
    title?: string;
    description?: string;
    regular_price?: string;
    discount_price?: string | null;
    product_image?: ProductImage[];
    slug: string;
    selectedSpecification?: {
        specification_name: string;
        value: string;
        price: string;
    };
}

export type CategoriesProps = {
    title: string
    category: string
}

export type Specifications = {
    specification_name: string
    value: string
    price: string | number
}

export type ProductImage = {
    image: string;
    alt_text: string | null;
};

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

export type OptionType = {
    id: number;
    name: string;
};

export type OptionValue = {
    id: number;
    option_value: {
        option_type: OptionType;
        label: string;
        price: string;
    };
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
    selectedOptions?: OptionValue[];
    options: OptionValue[];
};

export type CartItem = {
    id: string;
    product: Product;
    quantity: number;
    selectedAttribute?: AttributeValue;
    selectedOptions?: OptionValue[];
};

export type Category = {
    id: number;
    name: string;
    slug: string;
    products: Product[];
};