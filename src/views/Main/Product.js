import React, { useEffect, useState } from "react";
import { db, collection, query, where, getDocs } from "../../Config/firebase/DB";
import { useSelector } from "react-redux";
import ProductCard from "../../components/Cards/ProductCard";
import "./product.css";
import Slider from "../../components/Slider/Slider";
import Loader from "../../components/Loader/Loader";
import 'boxicons';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const searchTerm = useSelector((state) => state.search);
  const [categoryNotFound, setCategoryNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (category) => {
    setLoading(true);
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
    setLoading(false);
  };

  const filteredProducts = products.filter((product) =>
    product.Title.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  return (
    <div className="main container">
      <Slider />
      <div>
        <hr />
        <div className="categoryDiv" style={{ marginBottom: "50px" }}>
          <h1 className="heading">Categories</h1>
          <div
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center" }}
            className="buttons"
          >
            <div className="reset" onClick={() => fetchProducts()}>
              <box-icon name="reset"></box-icon>
            </div>
            <button onClick={() => fetchProducts("car")}>Cars</button>
            <button onClick={() => fetchProducts("bike")}>Bikes</button>
            <button onClick={() => fetchProducts("cloth")}>Clothes</button>
            <button onClick={() => fetchProducts("mobile")}>Mobiles</button>
            <button onClick={() => fetchProducts("property")}>Property</button>
            <button onClick={() => fetchProducts("other")}>Others</button>
          </div>
          <hr />
         
        </div>
        {loading ? (
          <Loader />
        ) : (
          <>
            {filteredProducts.length ? (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                }}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id || index} product={product} />
                ))}
              </div>
            ) : (
              <p>Search Item or category not Found</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductPage;
