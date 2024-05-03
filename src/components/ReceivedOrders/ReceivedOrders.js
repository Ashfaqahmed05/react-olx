import { collection, getDocs, query, where, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Config/firebase/DB";
import { auth } from "../../Config/firebase/DB";
import { useEffect, useState } from "react";
import OrderDetailModal from "../OrderDetailModal/OrderDetailModal";
import "./received.css";

const ReceivedOrders = ({ order }) => {
  const currentUserId = auth.lastNotifiedUid;
  const [receivedOrder, setReceivedOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);


  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };


  useEffect(() => {
    const fetchSentOrders = async () => {
      try {
        const q = query(collection(db, 'orders'), where('owner_ID', '==', currentUserId));
        const querySnapshot = await getDocs(q);
        const orders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setReceivedOrder(orders);
      } catch (error) {
        console.error('Error fetching sent orders:', error);
      }
    };

    fetchSentOrders();
  }, [currentUserId]);

  const updateOrderStatus = async (orderId, status) => {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, { status });
    setReceivedOrder(prevOrders =>
      prevOrders.map(order => (order.id === orderId ? { ...order, status } : order))
    );
  };

  return (
    <div className="mainDiv">
      {receivedOrder.length === 0 && <div>No orders!</div>}
      {receivedOrder.map((order) => (
        <div className="orderDiv" key={order.id} onClick={() => handleOrderClick(order)}>
          <img src={order.Image} alt={order.title} style={{ width: '100px', height: '100px' }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h3>{order.title}</h3>
            <p>Price: {order.price} Rs</p>
          </div>
          <div style={{ flexGrow: 1 }}></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>Quantity: {order.quantity}</p>
            <p>Total: {order.discountedTotal} Rs</p>
          </div>
          <p>
            Status: <span style={{ color: order.status === 'Accepted' ? 'green' : order.status === 'Declined' ? 'red' : 'black' }}>
              {order.status}
            </span>
          </p>
          {order.status === 'Pending' && (
            <div className="btnDiv">
              <button style={{ background: "green" }} onClick={() => updateOrderStatus(order.id, 'Accepted')}>Accept</button>
              <button style={{ background: "red" }} onClick={() => updateOrderStatus(order.id, 'Declined')}>Decline</button>
            </div>
          )}
        </div>
      ))}

      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default ReceivedOrders;
