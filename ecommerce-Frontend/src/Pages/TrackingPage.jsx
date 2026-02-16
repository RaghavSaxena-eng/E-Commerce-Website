import { Link, useParams } from 'react-router';
import { Header } from '../Components/Header';
import './TrackingPage.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

export function TrackingPage({ cart }) {

  const [order, setOrder] = useState(null);
  const {orderId, productId} = useParams();

  const fetchTrackingData = async () => {
    const response = await axios.get(`/api/orders/${orderId}?expand=products`);
    setOrder(response.data);
  }

  useEffect(()=> {
    fetchTrackingData()
  }, [orderId])

  if(!order) {
    return null;
  }

   const orderProduct = order.products.find((orderProduct) => {
    return orderProduct.productId === productId;
  });

  const totalDeliveryTimeMs = orderProduct.estimatedDeliveryTimeMs - order.orderTimesMs

  const timePassedMs = dayjs().valueOf() - order.orderTimesMs;

  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100

  if (deliveryPercent > 100) {

    deliveryPercent = 100;
  }

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;

  return (
    <>
      <Header cart={cart}/>
      <link rel="icon" type="image/svg+xml" href="/images/tracking-favicon.png" />
      <title>Tracking Page</title>

      <div className="tracking-page">
        <div className="order-tracking">
          <Link className="back-to-orders-link link-primary" to="/orders">
            View all orders
          </Link>

          <div className="delivery-date">{
          deliveryPercent >= 100? 
          (<p>Delivered on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM, D')}</p>) : 
          (<p>Arriving on {dayjs(orderProduct.estimatedDeliveryTimeMs).format('dddd, MMMM, D')}</p>)}
          </div>

          <div className="product-info">
            {orderProduct.product.name}
          </div>

          <div className="product-info">Quantity: {orderProduct.quantity}</div>

          <img
            className="product-image"
            src={orderProduct.product.image}
          />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing && 'current-status'}`}>Preparing</div>
            <div className={`progress-label ${isShipped && 'current-status'}`}>Shipped</div>
            <div className={`progress-label ${isDelivered && 'current-status'}`}>Delivered</div>
          </div>

          <div className="progress-bar-container" style={{width: `${deliveryPercent}`}}>
            <div className="progress-bar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
