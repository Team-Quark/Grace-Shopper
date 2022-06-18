import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAllUsers } from '../store/admin';
import { Link } from 'react-router-dom';

//INCORPORATE ADMIN LOGIN REQUIRED ERROR MESSAGE WHEN NOT ADMIIN
//INCORPORATE RETURN ADMIN STATUS ON LOGIN, TEST TO DISPLAY ADMIN TAB ON NAVBAR

const allUsers = (props) => {
  // console.log('=======PROPS=======> ', props);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    props.fetchAllUsers();
  }, users);

  return (
    <div>
      <h3>View all users</h3>
      {props.users
        ? props.users.map((user) => {
            return (
              <div key={user.id}>
                <div>{`Id: ${user.id}   Email: ${user.email}`}</div>
              </div>
            );
          })
        : 'test'}
    </div>
  );
};

const mapState = (state) => {
  return {
    users: state.admin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchAllUsers: () => dispatch(fetchAllUsers()),
  };
};

export default connect(mapState, mapDispatch)(allUsers);
