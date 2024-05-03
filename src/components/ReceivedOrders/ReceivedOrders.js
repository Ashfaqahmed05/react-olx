import { collection, getDocs } from "firebase/firestore"
import { db } from "../../Config/firebase/DB"
import { auth } from "../../Config/firebase/DB"

const ReceivedOrders = () => {

    const currentUserId = auth.lastNotifiedUid






  return (
    <div>ReceivedOrders</div>
  )
}

export default ReceivedOrders