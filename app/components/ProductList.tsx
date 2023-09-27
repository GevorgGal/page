"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import productsData from "../../data/product-fixtures.json";
import styles from "../styles/ProductList.module.css";

export interface Product {
  id: string;
  sku: string;
  name: string;
  type: string;
  description: string;
  color: string;
  price: number;
}

const ProductList: React.FC = () => {
  const [filterColor, setFilterColor] = useState("");
  const [colors, setColors] = useState<string[]>([]);

  useEffect(() => {
    const uniqueColors = Array.from(
      new Set(productsData.map((product) => product.color))
    );
    setColors(uniqueColors);
  }, []);

  const filteredProducts = productsData.filter(
    (product) => !filterColor || product.color === filterColor
  );

  return (
    <div>
      <div>
        <label>Filter by color:</label>
        <select
          value={filterColor}
          onChange={(e) => setFilterColor(e.target.value)}
        >
          <option value="">All colors</option>
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableHeader}>Name</th>
            <th className={styles.tableHeader}>Color</th>
            <th className={styles.tableHeader}>Type</th>
            <th className={styles.tableHeader}>Cost</th>
            <th className={styles.tableHeader}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product.id}>
                <td className={styles.tableData}>{product.name}</td>
                <td className={styles.tableData}>{product.color}</td>
                <td className={styles.tableData}>{product.type}</td>
                <td className={styles.tableData}>
                  ${product.price.toFixed(2)}
                </td>
                <td className={styles.tableData}>
                  <Link href={`/product-detail/${product.sku}`}>Edit</Link> |
                  <button onClick={() => setFilterColor(product.color)}>
                    Filter
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className={styles.tableData}>
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
