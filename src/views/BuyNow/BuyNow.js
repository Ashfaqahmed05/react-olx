import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { auth } from '../../Config/firebase/DB';
import { db } from '../../Config/firebase/DB';
import toast from 'react-hot-toast';
import "./style.css";

const BuyNow = () => {
    const { id } = useParams();
    const items = useSelector(state => state.cart);
    const selectedItem = items.find(item => item.Product_ID === id);


    const [quantity, setQuantity] = useState(1);
    const [total, setTotal] = useState(selectedItem ? selectedItem.Price : 0);
    const [discountedTotal, setDiscountedTotal] = useState(total - (total * (selectedItem ? selectedItem.Discount : 0) / 100));

    const [showModal, setShowModal] = useState(false);

    if (!selectedItem) {
        return <div>Product not found</div>;
    }

    const { Title, Price, Discount, FileURL, Product_ID, User_ID } = selectedItem;


    const increaseItem = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        setTotal(Price * newQuantity); 
        setDiscountedTotal((Price * newQuantity) - ((Price * newQuantity) * Discount / 100));
    }
    
    const decreaseItem = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            setTotal(Price * newQuantity); 
            setDiscountedTotal((Price * newQuantity) - ((Price * newQuantity) * Discount / 100));
        }
    }
    


    const handleBuyNow = () => {
        setShowModal(true);
    }

    return (
        <div className='maindiv'>
            <div className='left'>
                <div className='divTop'>
                    <img className='productImg' src={FileURL[0]} alt="" />
                    <h2>{Title}</h2>
                </div>
                <p>Price: ${Price}</p>
            </div>
            <div className='right'>
                <h3>Order</h3>
                <p>Amount: {Price} Rs</p>
                <p>Discount: {Discount || 0}%</p>
                <div className='btnDiv'>
                    <p className='quantity'>quantity:
                        <button onClick={increaseItem} className='bton'>+</button>
                        {quantity}
                        <button onClick={decreaseItem} className='bton'>-</button>
                    </p>
                    <p>Total: {total} Rs</p>
                    <p>Total after Discount: {parseFloat(discountedTotal).toFixed(0) } Rs</p>

                </div>
                <button onClick={handleBuyNow}>Buy Now</button>
            </div>
            {showModal && (
                <BuyModal
                    title={Title}
                    productImg={FileURL[0]}
                    price={Price}
                    quantity={quantity}
                    discountedTotal={discountedTotal}
                    productId={Product_ID}
                    ownerId={User_ID}
                    setShowModal={setShowModal}
                    currentUserID={auth.lastNotifiedUid}
                />
            )}
        </div>
    );
}

const BuyModal = ({ title, price, quantity, discountedTotal, setShowModal, productImg, productId, ownerId, currentUserID }) => {
    const [customerName, setCustomerName] = useState('');
    const [contact, setContact] = useState('');
    const [address, setAddress] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();

        const orderData = {
            title: title,
            Image: productImg,
            price: price,
            quantity: quantity,
            discountedTotal: discountedTotal,
            product_ID: productId,
            owner_ID: ownerId,
            status: "Pending",
            customerName: customerName,
            contact: contact,
            address: address,
            Customer_ID: currentUserID
        };

        try {
            const docRef = await addDoc(collection(db, "orders"), orderData);
            const orderId = docRef.id;
            await updateDoc(doc(db, "orders", docRef.id), { order_ID: orderId });
            toast.success("Order Successfully!")
            console.log("Order added with ID: ", docRef.id);
            setShowModal(false);
        } catch (error) {
            toast.error(error.message)
            console.error("Error adding order: ", error);
        }

    };

    return (
        <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1" aria-labelledby="buyModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="buyModalLabel">Order Details</h1>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="customerName" className="col-form-label">Customer Name</label>
                                <input required type="text" className="form-control" id="customerName" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contact" className="col-form-label">Contact</label>
                                <input required type="text" className="form-control" id="contact" value={contact} onChange={(e) => setContact(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address" className="col-form-label">Address</label>
                                <input required type="text" className="form-control" id="address" value={address} onChange={(e) => setAddress(e.target.value)} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                                <button type="submit" className="btn btn-primary">Place Order</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BuyNow;
