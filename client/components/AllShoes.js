import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchAllShoes } from '../store/allshoes';
import { Link } from 'react-router-dom';

const AllShoes = (props) => {

    const [shoes, setShoes] = useState([])

    useEffect(() => {
        props.fetchAllShoes();
    }, shoes)

    return (
        <div>
            {props.shoes.map(shoe => {
                return (
                    <div key={shoe.id}>
                        <Link to={`/shoes/${shoe.id}`} >
                            <h1>{shoe.name}</h1>
                            <h3>$${shoe.price}</h3>
                            <h5>{shoe.description}</h5>
                            <img src={shoe.imageUrl} />    
                        </ Link> 
                    </div>
                )
            })}
        </div>
    )
}

const mapState = (state) => {
    return {
        shoes: state.allshoes
    }
}

const mapDispatch = (dispatch) => {
    return {
        fetchAllShoes: () => dispatch(fetchAllShoes())
}}

export default connect(mapState,mapDispatch)(AllShoes)
