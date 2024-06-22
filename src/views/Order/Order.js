import ReceivedOrders from "../../components/ReceivedOrders/ReceivedOrders"
import SentOrders from "../../components/SentOrders/SentOrders"
import { useState } from "react";

const Orders = () => {
    const [showReceived, setShowReceived] = useState(true);

    const handleReceivedClick = () => {
        setShowReceived(true);
    };

    const handleSentClick = () => {
        setShowReceived(false);
    };

    return (
        <div style={{ minHeight: "80vh", }}>
            <div style={{ display: "flex" }}>
                <button onClick={handleReceivedClick}>Received</button>
                <button onClick={handleSentClick}>Sent</button>
            </div>
            {showReceived ? (
                <div>
                    <h3>Received Orders</h3>
                    <ReceivedOrders />
                </div>
            ) : (
                <div>
                    <h3>Sent Orders</h3>
                    <SentOrders />
                </div>
            )}
        </div>
    );
};


export default Orders