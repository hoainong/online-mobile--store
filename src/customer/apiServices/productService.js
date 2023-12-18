import * as request from '../../utils/request';

export const productService = async (category) => {
    try {
    
        const endpoint = category ? `products/brand/${category}` : 'products';
        const res = await request.get(endpoint);
        return res;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const productDetailService = async (id) => {
    try {
        const endpoint =  `product-detail/${id}` 
        const res = await request.get(endpoint);
        return res;
    } catch (error) {
        throw error;
    }
};
