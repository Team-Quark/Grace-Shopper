import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllShoes, fetchShoeType } from '../store/allshoes';
import { Link } from 'react-router-dom';
import {
  Grid,
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';

const AllShoes = (props) => {
  const [shoes, setShoes] = useState([]);
  const [type, setType] = useState('all');

  useEffect(() => {
    const localFilter = localStorage.getItem('ShoeType');
    if (localFilter) {
      filterShoe({ target: { value: localFilter } });
    } else {
      props.fetchAllShoes();
    }
  }, [shoes]);

  const filterShoe = (e) => {
    const { value } = e.target;
    localStorage.setItem('ShoeType', value);
    setType((prevState) => value);
    if (value === 'all') {
      props.fetchAllShoes();
    } else {
      props.fetchShoeType(value);
    }
  };

  const resetFilter = () => {
    // const {value} = e.target
    localStorage.removeItem('ShoeType');
    setType('all');
    props.fetchAllShoes();
  };

  return (
    <div>
      <label>Filter Shoe by Type:</label>
      <select name="shoeType" value={type} onChange={filterShoe}>
        <option value="all">All Shoes</option>
        <option value="basketball">Basketball</option>
        <option value="running">Running</option>
      </select>
      <button onClick={resetFilter}>Reset Filter</button>
      <Box sx={{ flexGrow: 1, marginTop: '75px' }}>
        <Grid container spacing={8} justifyContent="center">
          {props.shoes.map((shoe) => {
            return (
              <Grid item key={shoe.id}>
                <Card
                  sx={{ maxWidth: 400, boxShadow: 2, margin: 15 }}
                  component={Link}
                  to={`/shoes/${shoe.id}`}
                >
                  <CardContent>
                    <CardMedia
                      component="img"
                      style={{ width: 'auto', maxHeight: '400px' }}
                      image={shoe.imageUrl}
                    />
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="primary"
                      gutterBottom
                    >
                      {shoe.name}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="primary">
                      {shoe.price}
                    </Typography>
                    <Typography variant="body2">{shoe.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
};

const mapState = (state) => {
  return {
    shoes: state.allshoes,
  };
};

const mapDispatch = (dispatch, { history }) => {
  return {
    fetchAllShoes: () => dispatch(fetchAllShoes()),
    fetchShoeType: (type) => dispatch(fetchShoeType(type, history)),
  };
};

export default connect(mapState, mapDispatch)(AllShoes);
