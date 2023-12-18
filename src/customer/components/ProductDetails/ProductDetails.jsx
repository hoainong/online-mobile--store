import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { productDetailService } from "../../apiServices/productService";
import Review from "./Review";

const ProductDetails = () => {
  const [product, setProduct] = useState([]);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const isProductAvailable = product.quantity > 0;
  const isProductState = product.state;
  const isDiscount = product?.discount;

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const data = await productDetailService(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchApi();
  }, [id]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]);

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const addToCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).id
        : null;
      if (!user) {
        navigate("/login");
        return;
      }
      await fetch(
        `http://localhost:8080/api/cart/add-to-cart/${userId}/${product.id}`,
        {
          method: "POST",
        }
      );

      setIsAddedToCart(true);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };
  const buyNow = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).id
        : null;
      if (!user) {
        navigate("/login");
        return;
      }
      await fetch(
        `http://localhost:8080/api/cart/add-to-cart/${userId}/${product.id}`,
        {
          method: "POST",
        }
      );
      navigate(`/cart/${userId}`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <section className="overflow-hidden bg-white py-11 font-poppins dark:bg-gray-800">
        <div className="max-w-6xl px-4 py-4 mx-auto lg:py-8 md:px-6">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full mb-8 md:w-1/2 md:mb-0">
              <div className="sticky top-0 z-50 overflow-hidden">
                <div className="relative mb-6 lg:mb-10 lg:h-2/4">
                  <img
                    src={
                      selectedImage ||
                      (product?.images?.length > 0 && product.images[0])
                    }
                    alt=""
                    className="object-cover w-full lg:h-full"
                  />
                </div>
                <div className="flex-wrap hidden md:flex">
                  {product?.images?.map((img, i) => (
                    <div
                      key={i}
                      className={`w-1/2 p-2 sm:w-1/4 ${
                        selectedImage === img
                          ? "border border-blue-300 hover:border-blue-300"
                          : ""
                      }`}
                      onClick={() => handleImageClick(img)}
                    >
                      <div className="block">
                        <img
                          src={img}
                          alt=""
                          className="object-cover w-full lg:h-20"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="w-full px-4 md:w-1/2">
              <div className="lg:pl-20">
                <div className="mb-8">
                  <h2 className="max-w-xl mb-6 text-2xl font-bold dark:text-gray-400 md:text-4xl">
                    {product?.name}
                    {isProductState && isDiscount && (
                      <span className="ml-2 bg-red-700 text-white p-1 rounded-md  ">
                        sale
                      </span>
                    )}
                  </h2>
                  <p className="inline-block mb-6 text-4xl font-bold text-gray-700 dark:text-gray-400">
                    <span>
                      {product?.newPrice?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                    <span className="text-base font-normal text-gray-500 line-through dark:text-gray-400">
                      {product?.oldPrice?.toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </p>
                  <p className="max-w-md text-gray-700 dark:text-gray-400">
                    {product?.description}
                  </p>
                </div>
                <div className="mb-8">
                  <h2 className="w-16 pb-1 mb-4 text-2xl font-bold border-b border-blue-300 dark:text-gray-400 dark:border-gray-600">
                    <span className="mr-2">Color:</span>
                    <span className="capitalize whitespace-nowrap">
                      {product.color}
                    </span>
                  </h2>
                </div>
                <div className="mb-8">
                  <h2 className="w-16 pb-1 mb-4 text-xl font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                    RAM
                  </h2>
                  <div class="flex flex-wrap -mb-2">
                    <button class="px-4 py-2 mb-2 mr-4 font-semibold border rounded-md hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">
                      {product?.ram}
                    </button>
                  </div>
                  <div></div>
                </div>
                <div className="mb-8">
                  <h2 className="w-16 pb-1 mb-6 text-xl font-semibold border-b border-blue-300 dark:border-gray-600 dark:text-gray-400">
                    Storage
                  </h2>
                  <div>
                    <div class="flex flex-wrap -mb-2">
                      <button class="px-4 py-2 mb-2 mr-4 font-semibold border rounded-md hover:border-blue-400 dark:border-gray-400 hover:text-blue-600 dark:hover:border-gray-300 dark:text-gray-400">
                        {product?.rom}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    className="w-full p-4 bg-blue-500 rounded-md lg:w-2/5 dark:text-gray-200 text-gray-50 hover:bg-blue-600 dark:bg-blue-500 dark:hover:bg-blue-700"
                    disabled={
                      !isProductAvailable || !isProductState || isAddedToCart
                    }
                    onClick={addToCart}
                  >
                    {isAddedToCart ? "Added to Cart" : "Add to Cart"}
                  </button>
                  <button
                    className="flex items-center justify-center w-full p-4 text-blue-500 border border-blue-500 rounded-md lg:w-2/5 dark:text-gray-200 dark:border-blue-600 hover:bg-blue-600 hover:border-blue-600 hover:text-gray-100 dark:bg-blue-500 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:hover:text-gray-300"
                    disabled={!isProductAvailable || !isProductState}
                    onClick={buyNow}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Review />
    </div>
  );
};

export default ProductDetails;
