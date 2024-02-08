import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, doc, getDoc } from "../../Config/firebase/DB";
import './style.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const docRef = doc(db, 'Post', id);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          setProduct(docSnapshot.data());
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProductData();
  }, [id]);

  return (
    <div className="product-detail-container">
      {product ? (
        <>
          <div className="product-image">
            <img src={product.FileURL} alt={product.title} />
          </div>
          <div className="product-details">
            <h1>{product.Title}</h1>
            <p className="price">Price: ${product.Price}</p>
            <p className="description">{product.Description}</p>
            
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ProductDetail;