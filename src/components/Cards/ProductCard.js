import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { updateCart } from "../../Config/Store/cartSlice";
import toast from "react-hot-toast";


import "./style.css"

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const addtocart = ( cartproduct) => {

    if (cartproduct) {
      dispatch(updateCart(cartproduct));
      toast.success('Item added!');
    }
  }
  return (
    <>
      <div
        onClick={() => navigate(`/productdetail/${product.Product_ID}`)}
        className="card m-2 "
      >
        <img
          className="card-img-top"
          style={{ height: "200px" }}
          src={product.FileURL[0]}
          alt={product.Title}
        />
        <div className="card-body">
          <div className="head d-flex justify-content-between">
            <h5 className="card-title">Rs.{product.Price}</h5>
            <div className="icon" onClick={(event) => addtocart( product)}>
              <box-icon type='solid' name='cart-add'></box-icon>
            </div>
          </div>
          {product.Discount && (
            <p className="discount">{product.Discount}% OFF</p>
          )}
          <p className="card-text">{product.Description}</p>
          <div className="card-last">
            <h6 style={{ textTransform: 'capitalize' }}>{product.category}</h6>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;