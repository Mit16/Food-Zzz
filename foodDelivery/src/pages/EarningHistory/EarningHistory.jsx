import { useContext } from "react";
import "./EarningHistory.css";
import parcel_icon from "../../assets/parcel_icon.png";
import { DeliveryContext } from "../../context/Delivery.context";

const EarningHistory = () => {
  const { orders, totalEarnings } = useContext(DeliveryContext);

  return (
    <div className="order add">
      <h3>Earning History</h3>
      <p>Total Lifetime Earnings: ₹{totalEarnings}</p>
      {/* Optionally, you can fetch and display detailed historical records */}
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={parcel_icon} alt="" />
            <div>
              <p className="order-item-food">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className="order-item-name">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <div className="order-item-address">
                <p>{order.address.street + ","}</p>
                <p>
                  {order.address.city +
                    ", " +
                    order.address.state +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.zipcode}
                </p>
              </div>
              <p className="order-item-phone">{order.address.phone}</p>
            </div>
            <p>Items : {order.items.length}</p>
            <p>₹ {order.amount}</p>
            <p>₹ {order.deliveryAmount}</p>
            <p>{order.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarningHistory;
