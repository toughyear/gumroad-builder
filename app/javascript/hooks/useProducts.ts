import { useState, useEffect } from "react";
import useAuthStore from "../store/useAuthStore";
import { Product } from "../types/gumroad";

type UseProductsResult = {
  loading: boolean;
  error: string | null;
  products: Product[] | null;
};

const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchProducts = async () => {
      setError(null); // Clear previous errors

      if (!accessToken) {
        setLoading(false);
        setError("Access token is required.");
        return;
      }

      const url = new URL("https://api.gumroad.com/v2/products");
      url.searchParams.append("access_token", accessToken);

      try {
        const response = await fetch(url.toString(), {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();

        if (data.success) {
          setProducts(data.products);
        } else {
          throw new Error(data.message || "Unknown error occurred.");
        }
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [accessToken]); // Re-fetch when accessToken changes

  return { loading, error, products };
};

export default useProducts;
