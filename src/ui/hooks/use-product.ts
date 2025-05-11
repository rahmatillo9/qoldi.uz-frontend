
import { useState, useEffect } from "react";
import API from "@/lib/axios";
import { PaginatedProducts } from "../components/products/types";

export const useProducts = (limit: number = 20, initialOffset: number = 0) => {
  const [products, setProducts] = useState<PaginatedProducts["data"]>([]);
  const [offset, setOffset] = useState(initialOffset);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await API.get<PaginatedProducts>(`/product/paginated?limit=${limit}&offset=${offset}`);
      setProducts((prev) => [...prev, ...response.data.data]);
    } catch (err) {
      setError(`Mahsulotlarni yuklashda xatolik yuz berdi: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const loadMore = () => {
    setOffset((prev) => prev + limit);
  };

  return { products, loading, error, loadMore };
};
