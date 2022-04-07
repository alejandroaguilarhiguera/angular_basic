export interface ProductAttributes {
    name: string;
    description: string;
    price: number;
    image?: string;
} 

export interface Product {
    id?: string;
    attributes: ProductAttributes;
    createdAt?: string;
}

export interface NewProduct {
    name: ProductAttributes['name'];
    description: ProductAttributes['description'];
    price: ProductAttributes['price'];
    image?: ProductAttributes['image'];
}

export default Product;
