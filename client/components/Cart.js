import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchCart } from '../store/cart';

const Cart = props => {
    
    useEffect(() => {
        const list = props.user.cart.map(item => item.id);
        props.fetchCart(list);
    }, [])

    let cart = props.cart === undefined ? [] : props.cart
    return (
        <div>
            {cart.map(item => {
                return (
                    <div key={item.id}>
                            <h1>{item.name}</h1>
                            <h3>$${item.price}</h3>
                            <h5>{item.description}</h5>
                            <img src={item.imageUrl} />    
                    </div>
                )
            })}
        </div>
    )
}
const mapState = state => {
    return {
        user: state.auth,
        cart: state.cart.data
    }
}

const mapDispatch = dispatch => {
    return {
        fetchCart: (list) => dispatch(fetchCart(list))
    }
}

export default connect(mapState, mapDispatch)(Cart)