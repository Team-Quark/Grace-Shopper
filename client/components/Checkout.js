import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { completeOrder } from '../store/cart';

export const Checkout = (props) => {

    const dispatch = useDispatch();
    const {cart, auth} = useSelector((state) => {
        return state
    });

    useEffect(() => {
        dispatch(completeOrder());
    })
    return (
        <div>
            <h3>Thanks for purchasing, {auth.firstName}!</h3>
            {cart.map(item => {
                return (
                    <div>
                        <img src={item.imageUrl} width={200} />
                        <h4>{item.name}</h4>
                        <h5>Quantity: {item.Product_Order.quantity}</h5>
                    </div>
                )
            })}
            <h3>Total Price: ${cart.reduce((prev,next) => prev + (next.price * next.Product_Order.quantity),0)}</h3>
        </div>
    )
}
