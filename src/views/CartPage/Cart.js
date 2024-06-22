import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../Config/Store/cartSlice";
import { useNavigate } from "react-router-dom";
import "./style.css"

function Cart() {
  const items = useSelector(state => state?.cart?.cart);
  console.log(useSelector(state => state?.cart))
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <>
      {items.length ? (
        items.map((item, index) => (
          <div
            key={index}
            className="card m-2 "
            style={{ width: "300px", position: "relative" }}
          >
            <img
              className="card-img-top"
              style={{ height: "200px" }}
              src={item.FileURL[0]}
              alt={item.Title}
            />
            <div className="card-body">
              <h5 className="card-title">Rs.{item.Price}</h5>
              {item.Discount && <p className="discount">{item.Discount}% OFF</p>}
              <div className="card-last">
                <h6 style={{ textTransform: 'capitalize' }}>{item.category}</h6>
              </div>
              <button onClick={()=> navigate(`/buy/${item.Product_ID}`)}>Buy</button>
              <button onClick={() => dispatch(removeFromCart(item.Product_ID))}>Remove</button>
            </div>
          </div>
        ))
      ) : (
        <div className="emptydiv">
          <p>Empty Cart</p>

        </div>
      )}
    </>
  );
}

export default Cart;
