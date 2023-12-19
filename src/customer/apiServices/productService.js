import * as request from "../../utils/request";

export const productService = async (trademark) => {
  try {
    const endpoint1 = trademark ? `products/brand/${trademark}` : "products";
    const endpoint2 = trademark ? `trademark/${trademark}` : "1";
    const dataproduct = await request.get(endpoint1);
    console.log(dataproduct);
    return dataproduct;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const productDetailService = async (id) => {
  try {
    const endpoint = `product-detail/${id}`;
    const res = await request.get(endpoint);
    return res;
  } catch (error) {
    throw error;
  }
};

export const productDetailCategoryService = async (idProduct) => {
  try {
    const endpoint = `product-detail/category/${idProduct}`;
    const res = await request.get(endpoint);
    return res;
  } catch (error) {
    throw error;
  }
};

export const productByNameService = async (name) => {
  try {
    const endpoint = `products-by-name/${name}`;
    const res = await request.get(endpoint);
    return res;
  } catch (error) {
    throw error;
  }
};
