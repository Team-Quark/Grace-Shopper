import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../store/admin';
import { Link } from 'react-router-dom';
import { UpdateShoe } from './UpdateShoe';
import { AddShoe } from './AddShoe';
import { fetchdeleteShoe } from '../store/allshoes';
import AddShoeForm from './AddUpdateShoe';
import { List, Button, ListItem, Typography } from '@material-ui/core';
import { SaveIcon } from '@material-ui/icons';

//INCORPORATE ADMIN LOGIN REQUIRED ERROR MESSAGE WHEN NOT ADMIIN
//INCORPORATE RETURN ADMIN STATUS ON LOGIN, TEST TO DISPLAY ADMIN TAB ON NAVBAR

//change the name from allUsers to adminItems
const allUsers = () => {
  //console.log('=======PROPS=======> ', props);
  const [users, setUsers] = useState([]);
  const [shoes, setShoes] = useState([]);
  const [showAddShoe, setShowAddShoe] = useState(false);
  const [showEditShoe, setShowEditShoe] = useState(-1);

  useEffect(() => {
    const header = {
      headers: {
        authorization: window.localStorage.getItem('token'),
      },
    };

    try {
      axios.get('/api/users', header).then((results) => setUsers(results.data));
    } catch (error) {
      console.error(error);
    }

    try {
      axios.get('/api/shoes', header).then((results) => setShoes(results.data));
    } catch (error) {
      console.error(error);
    }
  }, []);

  const deleteShoeHandler = (id) => {
    try {
      axios.delete(`/api/shoes/${id}`, {
        headers: {
          authorization: window.localStorage.getItem('token'),
        },
      });
      setShoes((shoes) => shoes.filter((shoe) => shoe.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {console.log('USERS IN RETURN: ', users)}
      {console.log('PRODUCTS IN RETURN: ', shoes)}
      <h2 style={{ backgroundColor: 'lightblue' }}>VIEW ALL USERS</h2>

      {users ? (
        <List>
          {users.map((user) => {
            return (
              <ListItem key={user.id}>
                <div>{`ID: ${user.id}   Email: ${user.email}`}</div>

                <Link to={`/users/${user.id}/profile`}>
                  <Button
                    size="small"
                    style={{
                      fontsize: 6,
                      backgroundColor: '#21b6ae',
                      margin: '5px 36px',
                    }}
                    variant="contained"
                    color="primary"
                  >
                    Update User
                  </Button>
                </Link>
              </ListItem>
            );
          })}
        </List>
      ) : (
        'test'
      )}
      <h2 style={{ backgroundColor: 'lightblue' }}>VIEW ALL SHOES</h2>
      {/* <button type="submit" onClick={() => setShowAddShoe(!showAddShoe)}> */}
      <Button
        size="medium"
        style={{
          fontsize: 15,
          margin: '5px 36px',
          backgroundColor: 'lightgreen',
        }}
        variant="contained"
        onClick={() => setShowAddShoe(!showAddShoe)}
        backgroundcolor="lightblue"
      >
        Add Shoe
      </Button>

      {/* </button> */}
      {showAddShoe ? (
        <div>
          <div>-----</div>
          <AddShoeForm shoeData={{}} /> <div>-----</div>
        </div>
      ) : (
        ''
      )}
      {shoes ? (
        <List>
          {shoes.map((shoe) => {
            return (
              // <div key={shoe.id}>

              <ListItem key={shoe.id} style={{}}>
                <div>
                  <div style={{ fontsize: 4, marginRight: '18px' }}>
                    <h3>{`Id: ${shoe.id}   Name: ${shoe.name}`}</h3>
                  </div>

                  {
                    <Link to={`/shoes/${shoe.id}/update`}>
                      <Button
                        size="small"
                        style={{ fontsize: 3, margin: '5px 36px' }}
                        variant="contained"
                        color="primary"
                      >
                        Update Shoe
                      </Button>
                    </Link>
                  }
                  <br />
                  {
                    <Button
                      size="small"
                      style={{
                        fontsize: 3,
                        backgroundColor: 'red',
                        margin: '5px 36px',
                      }}
                      variant="contained"
                      onClick={() => deleteShoeHandler(shoe.id)}
                    >
                      DELETE SHOE
                    </Button>
                  }
                  <br />
                  <Button
                    size="small"
                    style={{ fontsize: 3, margin: '5px 36px' }}
                    variant="contained"
                    color="primary"
                    onClick={() => setShowEditShoe(shoe.id)}
                  >
                    EDIT SHOE
                  </Button>
                  <br />
                  {showEditShoe === shoe.id ? (
                    <div>
                      <div>-----</div>
                      <AddShoeForm shoeData={shoe} /> <div>-----</div>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
                <ul>
                  <li>{`Price: ${shoe.price}`}</li>
                  <li>{`Description: ${shoe.description}`}</li>
                  <li>{`Image URL: ${shoe.imageUrl}`}</li>
                </ul>
              </ListItem>
            );
          })}
        </List>
      ) : (
        'test'
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    // admin: state.admin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
  };
};

export default connect(mapState, mapDispatch)(allUsers);
