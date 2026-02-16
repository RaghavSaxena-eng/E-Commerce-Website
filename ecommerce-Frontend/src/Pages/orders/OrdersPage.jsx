import { Header } from "../../Components/Header";
import axios from "axios";
import { useState, useEffect, Fragment } from "react";
import "./OrdersPage.css";
import { OrdersGrid } from "./OrdersGrid";

export function OrdersPage({ cart }) {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const response = await axios.get("/api/orders?expand=products");
    setOrders(response.data);
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <>
      <Header cart={cart} />

      {/* <link rel="icon" type="image/svg+xml" href="orders-favicon.png" /> */}

      <title>Orders</title>

      <div className="orders-page">
        <div className="page-title">Your Orders</div>

       <OrdersGrid orders={orders}/>
      </div>
    </>
  );
}
