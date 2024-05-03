import React, { useEffect, useState } from "react";
import { db, getDocs, collection, query, where } from "../../Config/firebase/DB";
import ProductCard from "../../components/Cards/ProductCard";
import "./product.css";
import { BoxIconElement } from "boxicons";
import Slider from "../../components/Slider/Slider";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [categoryNotFound, setCategoryNotFound] = useState(false);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (category) => {
    try {
      let q;
      if (category) {
        q = query(collection(db, "Post"), where("category", "==", category));
      } else {
        q = query(collection(db, "Post"));
      }
      const querySnapshot = await getDocs(q);
      const productsData = [];

      querySnapshot.forEach((doc) => {
        const product = doc.data();
        productsData.push(product);
      });

      setProducts(productsData);
      setCategoryNotFound(productsData.length === 0);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
   if (!products.length && !categoryNotFound) {
    return (
      <div className="loadingDiv">
        <div className="loader"></div>

      </div>
  );
  }

  return (
    <div className="main container" >
      <Slider />
      <div>
        <hr />
      <div className="categoryDiv" style={{ marginBottom: '50px' }}>
        <h1 className="heading">Categories</h1>
        <div style={{ display: "flex",flexWrap: "wrap" , alignItems: "center"}} className="buttons">
         <div className="reset" onClick={() => fetchProducts()}><box-icon name='reset'></box-icon></div>
          <button onClick={() => fetchProducts("car")}>Cars</button>
          <button onClick={() => fetchProducts("bike")}>Bikes</button>
          <button onClick={() => fetchProducts("cloth")}>Clothes</button>
          <button onClick={() => fetchProducts("mobile")}>Mobiles</button>
          <button onClick={() => fetchProducts("property")}>Property</button>
          <button onClick={() => fetchProducts("other")}>Others</button>
        </div>
        <hr />
        {categoryNotFound && <p>Item not found for the selected category.</p>}
      </div>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {products.map((product, index) => (
          <ProductCard key={product.UserId || index} product={product} />
        ))}
      </div>
    </div>
    </div>
  );
}

export default ProductPage;