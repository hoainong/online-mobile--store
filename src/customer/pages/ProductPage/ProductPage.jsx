import React, { useEffect, useState } from 'react'
import Product from '../../components/Product/Product'
import  { productService } from '../../apiServices/productService';
import { useParams } from 'react-router-dom';
const ProductPage = () => {
  const [products, setProduct] = useState([]);
  const { category } = useParams();
  
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const response = await productService(category);
        setProduct(response);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchApi();
  }, [category]);
  return (
    <div>
      <Product data={products}/>
    </div>
  )
}

export default ProductPage
