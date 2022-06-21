import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../store/admin';
import { Link } from 'react-router-dom';
import { UpdateShoe } from './UpdateShoe';
import { AddShoe } from './AddShoe';
import { fetchdeleteShoe } from '../store/allshoes';
import AddShoeForm from './AddUpdateShoe';

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
      <h3>View all users</h3>
      {users
        ? users.map((user) => {
            return (
              <div key={user.id}>
                <div>{`Id: ${user.id}   Email: ${user.email}`}</div>
              </div>
            );
          })
        : 'test'}
      <h3>View all Shoes</h3>
      <button type="submit" onClick={() => setShowAddShoe(!showAddShoe)}>
        Add Shoe
      </button>
      {showAddShoe ? (
        <div>
          <div>-----</div>
          <AddShoeForm shoeData={{ name: 'test' }} /> <div>-----</div>
        </div>
      ) : (
        ''
      )}
      {shoes
        ? shoes.map((shoe) => {
            return (
              <div key={shoe.id}>
                <div>
                  {`Id: ${shoe.id}   Name: ${shoe.name}`}{' '}
                  {
                    <Link to={`/shoes/${shoe.id}/update`}>
                      <button type="button">Update Shoe</button>
                    </Link>
                  }{' '}
                  {
                    <button
                      type="submit"
                      onClick={() => deleteShoeHandler(shoe.id)}
                    >
                      X
                    </button>
                  }
                  <button
                    type="submit"
                    onClick={() => setShowEditShoe(shoe.id)}
                  >
                    Edit Shoe Test
                  </button>
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
              </div>
            );
          })
        : 'test'}
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
