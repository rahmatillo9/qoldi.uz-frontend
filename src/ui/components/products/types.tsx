
export interface ProductImage {
  id: number;
  imageUrl: string;
  productId: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProductUser {
  id: number;
  username: string;
  avatar: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  status: string;
  categoryId: number;
  userId: number;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  images: ProductImage[];
  user: ProductUser;
}

export interface PaginatedProducts {
  data: Product[];
}


export interface ProductCardProps {
  product: Product;
}

export interface Location {
  city: string;
  district: string;
}
