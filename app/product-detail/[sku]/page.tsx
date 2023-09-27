"use client";

import { useParams } from "next/navigation";
import ProductDetail from "../../components/ProductDetail";

const ProductDetailPage: React.FC = () => {
  const { sku } = useParams();

  if (!sku || Array.isArray(sku)) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ProductDetail sku={sku} />
    </div>
  );
};

export default ProductDetailPage;
