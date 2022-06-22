import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

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
      <Card color="grey">
        {orders ? (
          <div>
            {orders.map((order) => {
              return (
                <div key={order.id}>
                  <div>Order Date: {order.createdAt.slice(0, 10)}</div>
                  <div>Confirmation Code: {order.confirmCode}</div>
                  <div>Shipping Address: {order.shippingAddress}</div>
                  <p>Ordered Items:</p>
                  <div>
                    <CardContent>
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
                    </CardContent>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div></div>
        )}
      </Card>
    </div>
  );
};

export default userOrders;
