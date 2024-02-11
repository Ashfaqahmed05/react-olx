import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css"

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    return (
      <>
        <div
          onClick={() => navigate(`/productdetail/${product.UserId}`)}
          className="card m-2 "
          style={{ width: "300px", position: "relative" }}
        >
          <img
            className="card-img-top"
            style={{ height: "200px" }}
            src={product.FileURL[0]}
            alt={product.Title}
          />
          <div className="card-body">
            <h5 className="card-title">Rs.{product.Price}</h5>
            {product.Discount && (
            <p className="discount">{product.Discount}% OFF</p>
          )}
            <p className="card-text">{product.Description}</p>
            <div className="card-last">
              <h6 style={{textTransform: 'capitalize'}}>{product.category}</h6>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default ProductCard;