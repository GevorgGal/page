"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import productsData from "../../data/product-fixtures.json";
import Link from "next/link";
import { Product } from "./ProductList";
import styles from "../styles/ProductDetail.module.css";

interface ProductDetailProps {
  sku: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ sku }) => {
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchedProduct = productsData.find((p) => p.sku === sku);
    if (fetchedProduct) {
      setProduct(fetchedProduct);
    } else {
      setError("Product not found");
    }
  }, [sku]);

  const handleInputChange = (field: keyof Product, value: string | number) => {
    setProduct((prevProduct) => {
      if (!prevProduct) return null;
      return { ...prevProduct, [field]: value } as Product;
    });
  };

  const updateProduct = () => {
    if (product) {
      if (product.price < 0) {
        alert("Price cannot be less than 0");
        return;
      }

      if (!product.type || product.type.length > 56) {
        alert("Type is required and should be less than 56 characters.");
        return;
      }

      if (!product.description || product.description.length > 56) {
        alert("Description is required and should be less than 56 characters.");
        return;
      }

      if (!product.color || product.color.length > 56) {
        alert("Color is required and should be less than 56 characters.");
        return;
      }

      // TODO: We need to save the updated product data (sending to a server?)

      router.push("/product-list");
    }
  };

  if (error) return <div>{error}</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Edit Product</h2>

      <div className={styles.field}>
        <label className={styles.label}>Name: </label>
        <input
          className={styles.input}
          value={product.name}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Type: </label>
        <input
          className={styles.input}
          value={product.type}
          onChange={(e) => handleInputChange("type", e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Description: </label>
        <input
          className={styles.input}
          value={product.description}
          onChange={(e) => handleInputChange("description", e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Color: </label>
        <input
          className={styles.input}
          value={product.color}
          onChange={(e) => handleInputChange("color", e.target.value)}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Price: </label>
        <input
          className={styles.input}
          type="number"
          value={product.price}
          onChange={(e) =>
            handleInputChange("price", parseFloat(e.target.value))
          }
        />
      </div>

      <button className={styles.button} onClick={updateProduct}>
        Update
      </button>
      <Link href="/" className={styles.backLink}>
        Back to Products
      </Link>
    </div>
  );
};

export default ProductDetail;
