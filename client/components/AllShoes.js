import React, { useState, useEffect } from "react";
import { connect, } from "react-redux";
import { fetchAllShoes, fetchShoeType } from "../store/allshoes";
import { Link } from "react-router-dom";

const AllShoes = (props) => {
  const [shoes, setShoes] = useState([]);
  const [type, setType] = useState('all');


  useEffect(() => {
    const localFilter = localStorage.getItem('ShoeType')
if( localFilter){
    filterShoe({target: {value: localFilter}})
} else{
    props.fetchAllShoes()
}
  }, [shoes]);

  const filterShoe = (e) =>{
    const {value} = e.target
    localStorage.setItem('ShoeType', value)
    setType(prevState => value)
if (value === 'all'){
    props.fetchAllShoes();
} else{
    props.fetchShoeType(value);
}
  }

  const resetFilter = () =>{
    // const {value} = e.target
    localStorage.removeItem('ShoeType')
    setType("all");
    props.fetchAllShoes();

  }

  return (
    <div>
      <label>Filter Shoe by Type:</label>
      <select name="shoeType" value={type} onChange={filterShoe}>
        <option value="all">All Shoes</option>
        <option value="basketball">Basketball</option>
        <option value="running">Running</option>
      </select>
      <button onClick={resetFilter}>Reset Filter</button>
      {props.shoes.map((shoe) => {
        return (
          <div key={shoe.id}>
            <Link to={`/shoes/${shoe.id}`}>
              <h1>{shoe.name}</h1>
              <h3>${shoe.price}</h3>
              <h5>{shoe.description}</h5>
              <img src={shoe.imageUrl} width={400} />
            </Link>
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

const mapDispatch = (dispatch, {history}) => {
  return {
    fetchAllShoes: () => dispatch(fetchAllShoes()),
    fetchShoeType: (type) => dispatch(fetchShoeType(type, history)),
  };
};

export default connect(mapState, mapDispatch)(AllShoes);
