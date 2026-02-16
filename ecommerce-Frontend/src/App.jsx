import { Routes, Route } from "react-router";
import { HomePage } from "./Pages/home/HomePage.jsx";
import { CheckoutPage } from "./Pages/checkout/CheckoutPage.jsx";
import { OrdersPage } from "./Pages/orders/OrdersPage.jsx";
import { TrackingPage } from "./Pages/TrackingPage.jsx";
import { ErrorPage } from "./Pages/ErrorPage.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);

    const loadCart = async () => {
      const response = await axios.get("/api/cart-items?expand=product");
      setCart(response.data);
    };

  useEffect(() => {
  loadCart();
  }, []);

  return (
    <Routes>
      <Route index element={<HomePage cart={cart} loadCart={loadCart}/>} />
      <Route path="checkout" element={<CheckoutPage cart={cart} />} />
      <Route path="orders" element={<OrdersPage cart={cart} />} />
      <Route path="tracking/:orderId/:productId" element={<TrackingPage cart={cart} />} />
      <Route path="*" element={<ErrorPage cart={cart}/>} />
    </Routes>
  );
}

export default App;
