import React, { useState } from 'react';

const OrderDetailModal = ({ order, onClose }) => {

  const { customerName, contact, address, title, price, quantity, discountedTotal, status, orderAt } = order;

  return (
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }} tabIndex="-1" aria-labelledby="buyModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="buyModalLabel">Order Details</h1>
            <button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form style={{ height: "400px"}}>
              <div className="mb-2">
                <label htmlFor="customerName" className="col-form-label">Customer Name: <span style={{ fontWeight: 300 }}>{customerName}</span></label>
                <p></p>
              </div>
              <div className="mb-2">
                <label htmlFor="contact" className="col-form-label">Contact:<span style={{ fontWeight: 300 }}>{contact}</span></label>
              </div>
              <div className="mb-2">
                <label htmlFor="address" className="col-form-label">Address: <span style={{ fontWeight: 300 }}>{address}</span></label>
              </div>
              <div className="mb-2">
                <label htmlFor="Product" className="col-form-label">Product: <span style={{ fontWeight: 300 }}>{title}</span></label>
              </div>
              <div className="mb-2">
                <label htmlFor="Price" className="col-form-label">Price: <span style={{ fontWeight: 300 }}>{price}</span></label>
              </div>
              <div className="mb-2">
                <label htmlFor="Quantity" className="col-form-label">Quantity: <span style={{ fontWeight: 300 }}>{quantity}</span></label>
              </div>
              <div className="mb-2">
                <label htmlFor="Total" className="col-form-label">Total: <span style={{ fontWeight: 300 }}>{discountedTotal}</span></label>
              </div>
              <div className="mb-2">
                <label htmlFor="Date" className="col-form-label">Order At: <span style={{ fontWeight: 300 }}>{orderAt}</span></label>
              </div>
              <div className="mb-3">
                <label htmlFor="Status" className="col-form-label">Status: <span style={{ fontWeight: 300, color: status === 'Accepted' ? 'green' : status === 'Declined' ? 'red' : 'black' }}>{status}</span></label>
              </div>
            </form>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailModal;
