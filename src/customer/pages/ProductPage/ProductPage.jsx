import React, { useEffect, useState } from "react";
import Product from "../../components/Product/Product";
import { productService } from "../../apiServices/productService";
import { useParams } from "react-router-dom";
const ProductPage = () => {
  const [products, setProduct] = useState([]);
  const { trademark } = useParams();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await productService(trademark);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchApi();
  }, [trademark]);
  return (
    <div>
      <Product data={products} trademark={trademark} />
    </div>
  );
};

export default ProductPage;
