export interface CategoryName {
    uz: string;
    ru: string;
    en: string;
  }
  
 export interface ProductImage {
    id: number;
    imageUrl: string;
    productId: number;
    createdAt: string;
    updatedAt: string;
  }
  
 export interface User {
    id: number;
    username: string;
    avatar: string;
  }
  
export  interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    status: "available" | "sold";
    categoryId: number;
    userId: number;
    latitude: number;
    longitude: number;
    createdAt: string;
    updatedAt: string;
    images: ProductImage[];
    user: User;
  }
  
 export interface CategoryResponse {
    id: number;
    name: CategoryName;
    createdAt: string;
    updatedAt: string;
    products: Product[];
  }