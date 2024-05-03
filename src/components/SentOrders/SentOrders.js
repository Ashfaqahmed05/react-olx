import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../Config/firebase/DB"
import { auth } from "../../Config/firebase/DB"
import { useEffect, useState } from "react"
import "./style.css"

const SentOrders = () => {

    const currentUserId = auth.lastNotifiedUid

    const [sentOrders, setSentOrders] = useState([]);

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
              if (doc.data().status === 'pending') {
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
    
      console.log(sentOrders);

   

  return (
    <div>
        {sentOrders.length === 0 && <div>No orders!</div>}
        {sentOrders.map((order) => (
            <div className="orderDiv" key={order.id}>
                <img src={order.Image} alt={order.title} style={{ width: '100px', height: '100px' }} />
                <div style={{display: "flex", flexDirection: "column"}}>
                <h3>{order.title}</h3>
                <p>Price: {order.price} Rs</p>

                </div>
                <div style={{ flexGrow: 1}}></div>
                <div style={{display: "flex", flexDirection: "column"}}>
                <p>Quantity: {order.quantity}</p>
                <p>Total: {order.price * order.discountedTotal} Rs</p>

                </div>
                <p>Status: {order.status}</p>
            </div>
        ))}
    </div>
    
  )
}

export default SentOrders