import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../Config/firebase/DB"
import { auth } from "../../Config/firebase/DB"
import { useEffect, useState } from "react"
import OrderDetailModal from "../OrderDetailModal/OrderDetailModal"
import "./style.css"

const SentOrders = () => {

  const currentUserId = auth.lastNotifiedUid
  const [sentOrders, setSentOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchSentOrders = async () => {
      try {
        const q = query(
          collection(db, 'orders'),
          where('Customer_ID', '==', currentUserId)
        );
        const querySnapshot = await getDocs(q);
        const orders = [];
        querySnapshot.forEach((doc) => {
          if (doc.data()) {
            orders.push({ id: doc.id, ...doc.data() });
          }
        });
        setSentOrders(orders);
        console.log(orders);
      } catch (error) {
        console.error('Error fetching sent orders:', error);
      }
    };

    fetchSentOrders();
  }, [currentUserId]);


  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };


  return (
    <div>
      {sentOrders.length === 0 && <div>No orders!</div>}
      {sentOrders.map((order) => (
        <div className="orderDiv" key={order.id} onClick={() => handleOrderClick(order)}>
          <img src={order.Image} alt={order.title} style={{ width: '100px', height: '100px' }} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <h4>{order.title}</h4>
            <p>Price: {order.price} Rs</p>

          </div>
          <div style={{ flexGrow: 1 }}></div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <p>Quantity: {order.quantity}</p>
            <p>Total: {order.price * order.discountedTotal} Rs</p>

          </div>
          <p>Status: <span style={{ color: order.status === 'Accepted' ? 'green' : order.status === 'Declined' ? 'red' : 'black' }}
          >{order.status}
          </span></p>
        </div>
      ))}
      {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={handleCloseModal} />
      )}
    </div>

  )
}

export default SentOrders