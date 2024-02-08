import React, { useEffect, useState } from "react";
import { db, getDocs, collection } from "../../Config/firebase/DB";
import Navbar from "../../components/Navbar/Navbar";
import ProductCard from "../../components/Cards/ProductCard";
import "./product.css";

function ProductPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Post"));
      const productsData = [];

      querySnapshot.forEach((doc) => {
        const product = doc.data();
        // console.log(product);
        productsData.push(product);
        // console.log(product.FileURL);
      });

      setProducts(productsData);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  if (!products.length) {
    return <div className="loader"></div>;
  }

  return (
    <div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {products.map((product, index) => (
          <ProductCard key={product.UserId || index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductPage;