import { useState, useEffect, useCallback } from "react";
import { productApi } from "../api";
import type { Product, ProductFormData } from "../types";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const loadProducts = useCallback(async () => {
    try {
      const data = await productApi.getAll();
      setProducts(data);
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    }
  }, []);

  useEffect(() => {
    let ignore = false;

    const fetchInitialData = async () => {
      try {
        const data = await productApi.getAll();
        if (!ignore) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      }
    };

    fetchInitialData();
    return () => {
      ignore = true;
    };
  }, []);

  const addProduct = async (data: ProductFormData) => {
    await productApi.create(data);
    await loadProducts();
  };

  const updateProduct = async (id: number, data: ProductFormData) => {
    await productApi.update(id, data);
    await loadProducts();
  };

  const deleteProduct = async (id: number) => {
    if (!window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) return;
    await productApi.delete(id);
    await loadProducts();
  };

  return { products, addProduct, updateProduct, deleteProduct };
};
