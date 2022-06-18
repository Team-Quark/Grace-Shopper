import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllShoes } from '../store/allshoes';
import { Link } from 'react-router-dom';
import { fetchdeleteShoe } from '../store/allshoes';

const AllShoes = (props) => {
  const [shoes, setShoes] = useState([]);

  useEffect(() => {
    props.fetchAllShoes();
  }, shoes);

  return (
    <div>
      {props.shoes.map((shoe) => {
        return (
          <div key={shoe.id}>
            <Link to={`/shoes/${shoe.id}`}>
              <h1>{shoe.name}</h1>
              <h3>$${shoe.price}</h3>
              <h5>{shoe.description}</h5>
              <img src={shoe.imageUrl} />
            </Link>
            <button type="button" onClick={() => props.deleteShoe(shoe.id)}>
              X
            </button>
          </div>
        );
      })}
    </div>
  );
};

const mapState = (state) => {
  return {
    shoes: state.allshoes,
  };
};

const mapDispatch = (dispatch, history) => {
  return {
    fetchAllShoes: () => dispatch(fetchAllShoes()),
    deleteShoe: (id) => dispatch(fetchdeleteShoe(id, history)),
  };
};

export default connect(mapState, mapDispatch)(AllShoes);
