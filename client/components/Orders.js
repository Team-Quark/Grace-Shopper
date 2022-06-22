import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const userOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    console.log('useEffect is running');
    const header = {
      headers: {
        authorization: window.localStorage.getItem('token'),
      },
    };

    try {
      axios
        .get('/api/users/orders', header)
        .then((results) => setOrders(results.data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  console.log('ORDERS ORDERS ORDERS', orders);

  return (
    <div>
      {orders ? (
        <div>
          {orders.map((order) => {
            return (
              <div key={order.id}>
                <div>Order Date: {order.createdAt}</div>
                <li>Confirmation Code: {order.confirmCode}</li>
                <li>Shipping Address: {order.shippingAddress}</li>
                <p>Ordered Items:</p>
                <div>
                  {order.products.map((product) => {
                    console.log('PRODUCT ID IS ', product.id);
                    return (
                      <li key={product.id}>
                        {' '}
                        {`${product.Product_Order.quantity} EA --  ${product.name} @ $${product.price}`}{' '}
                        <Link to={`/shoes/${product.id}`}>
                          <>[View]</>
                        </Link>
                      </li>
                    );
                  })}
                </div>
                <div>-------</div>
              </div>
            );
          })}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default userOrders;
