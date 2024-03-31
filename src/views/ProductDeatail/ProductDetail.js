import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db, doc, getDoc } from "../../Config/firebase/DB";
import { useDispatch } from 'react-redux';
import './style.css';
import { updateCart } from '../../Config/Store/cartSlice';

const ProductDetail = () => {
  const dispatch = useDispatch()
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
  function addtocart() {
    if (product) {
      const { id, Title, Price } = product;
      dispatch(updateCart({ id, title: Title, price: Price }));
      alert('Added');
    }
  }
  

  return (
    <div className="detailContainer">
      {product ? (
        <>
          <div className="product-image">
            <div id="carouselExampleIndicators" className="carousel slide">
              <div className="carousel-indicators">
                {product.FileURL.map((url, index) => (
                  <button key={index} type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? 'active' : ''} aria-label={`Slide ${index + 1}`}>
                    <img src={url} className="d-block w-100" alt={`Slide ${index + 1}`} />
                  </button>
                ))}
              </div>
              <div className="carousel-inner">
                {product.FileURL.map((url, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <img src={url} className="images d-block w-100" alt={product.Title} />
                  </div>
                ))}
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>

          </div>
          <div className="product-details">
            <div>
              <h1>{product.Title}</h1>
              <div className="cartImgDiv" onClick={() => addtocart(product.title)}>
                <box-icon type='solid' name='cart-add'></box-icon>
              </div>
            </div>

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